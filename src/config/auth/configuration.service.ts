import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthConfigService {
	constructor (
        private readonly configService: ConfigService
	) {}

	get secret() {
		return this.configService.get<string>("auth.secret");
	}
}