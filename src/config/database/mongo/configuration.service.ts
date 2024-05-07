import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MongoConfigService {
	constructor (
        private readonly configService: ConfigService
	) {}

	get uri() {
		return this.configService.get<string>("mongo.uri"); 
	}
}