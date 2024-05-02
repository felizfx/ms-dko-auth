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

@Module({
	imports: [
		AppConfigModule, 
		AuthConfigModule,
		SwaggerConfigModule,
		PostgresDatabaseProviderModule,
		UserModule,
		AuthModule,
		EmailModule
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard
		}
	]
})
export class AppModule {}

