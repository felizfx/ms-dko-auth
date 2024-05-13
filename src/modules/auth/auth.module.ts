import { Module } from "@nestjs/common";
import { AuthConfigModule } from "src/config/auth/configuration.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { KafkaModule } from "src/providers/queue/kafka/kafka.module";

@Module({
	imports: [
		AuthConfigModule, 
		UserModule,
		JwtModule.register({
			global: true,
			signOptions: { expiresIn: "3h" },
		}),
		KafkaModule,
	],
	controllers: [AuthController],
	providers: [AuthService]
})
export class AuthModule {}