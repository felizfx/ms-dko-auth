import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { PostgresConfigModule } from "src/config/database/postgres/config.module";
import { PostgresConfigService } from "src/config/database/postgres/config.service";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [PostgresConfigModule],
			useFactory: async (postgresConfigService: PostgresConfigService) => ({
				type: "postgres",
				url: postgresConfigService.url,
				autoLoadEntities: true,
				synchronize: true,
			}),
			inject: [PostgresConfigService]
		} as TypeOrmModuleAsyncOptions)
	]
})
export class PostgresDatabaseProviderModule {}