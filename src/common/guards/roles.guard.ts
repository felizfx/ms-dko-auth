/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthConfigService } from "src/config/auth/configuration.service";
import { User } from "src/modules/user/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor (
        private readonly authConfigService: AuthConfigService,
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
		@InjectRepository(User)
		private readonly userRespository: Repository<User>
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const role = this.reflector.getAllAndOverride("roles", [
			context.getHandler(),
			context.getClass()
		]);

		if (!role) return true;

		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);
		if (!token) throw new UnauthorizedException("Jwt token not provided");

		try {
			request["user"] = this.jwtService.verify(token, {
				secret: this.authConfigService.secret
			});
		} catch {
		    throw new UnauthorizedException("Invalid jwt token provided");
		}

		// if(request["user"].role !== role) throw new ForbiddenException("User role not qualified");
		// ou (isso afeta um pouco	 no desempnaho da aplicação \o/)
		const user = await  this.userRespository.findOneBy({ id: request["user"].id });
		if(user.role !== role) throw new ForbiddenException("User role not qualified");

		return true;
	}

	private extractTokenFromHeader(request: any): string | undefined {
		const [type, token] = request.headers.authorization?.split(" ") ?? [];
		return type === "Bearer" ? token : undefined;
	}
    
}