import { Module } from "@nestjs/common";
import { AppConfigModule } from "../config/app/configuartion.module";
import { SwaggerConfigModule } from "../config/swagger/configuration.module";
import { UserModule } from "./user/user.module";
import { PostgresDatabaseProviderModule } from "src/providers/database/postgres/provider.module";
import { AuthModule } from "./auth/auth.module";
import { AuthGuard } from "src/common/guards/auth.guard";
import { APP_GUARD } from "@nestjs/core";
import { AuthConfigModule } from "src/config/auth/configuration.module";
import { EmailModule } from "./email/email.module";
import { MongoDatabaseProviderModule } from "src/providers/database/mongo/provider.module";

@Module({
	imports: [
		AppConfigModule, 
		AuthConfigModule,
		AuthModule,
		EmailModule,
		MongoDatabaseProviderModule,
		PostgresDatabaseProviderModule,
		SwaggerConfigModule,
		UserModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard
		}
	]
})
export class AppModule {}

