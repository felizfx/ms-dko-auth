import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./configuration";
import { Module } from "@nestjs/common";
import { MongoConfigService } from "./configuration.service";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration]
		})
	],
	providers: [MongoConfigService, ConfigService],
	exports: [MongoConfigService, ConfigService],
})
export class MongoConfigModule {

}