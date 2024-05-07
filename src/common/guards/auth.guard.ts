/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { AuthConfigService } from "src/config/auth/configuration.service";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor (   
        private readonly authConfigService: AuthConfigService,
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService
	) {}

	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>("isPublic", [
			context.getHandler(),
			context.getClass()
		]);

		if (isPublic) return true;

		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);

		if (!token) throw new UnauthorizedException("Jwt token not provided");

		try {
			const payload = this.jwtService.verify(token, {
				secret: this.authConfigService.secret
			});

			request["user"] = payload;
		} catch (e) {
		    throw new UnauthorizedException("Invalid jwt token");
		}
    
		return true;
	}
    
	private extractTokenFromHeader(request: any): string | undefined {
		const [type, token] = request.headers.authorization?.split(" ") ?? [];
		return type === "Bearer" ? token : undefined;
	}
}