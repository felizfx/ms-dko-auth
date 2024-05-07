import { Module } from "@nestjs/common";
import { MongooseModule, MongooseModuleAsyncOptions } from "@nestjs/mongoose";
import { MongoConfigModule } from "src/config/database/mongo/configuration.module";
import { MongoConfigService } from "src/config/database/mongo/configuration.service";

@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [MongoConfigModule],
			useFactory: async (mongoConfigService: MongoConfigService) => ({
				uri: mongoConfigService.uri,
				autoCreate: true
			}),
			inject: [MongoConfigService]
		} as MongooseModuleAsyncOptions)
	]
})
export class MongoDatabaseProviderModule {}