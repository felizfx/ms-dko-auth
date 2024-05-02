import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { IsEmailAlreadyinUseConstraint } from "src/common/constraints/is-email-already-in-use.constraint";
import { RolesGuard } from "src/common/guards/roles.guard";
import { AuthConfigModule } from "src/config/auth/configuration.module";

@Module({
	imports: [TypeOrmModule.forFeature([User]), AuthConfigModule],
	controllers: [UserController],
	providers: [UserService, IsEmailAlreadyinUseConstraint, RolesGuard],
	exports: [UserService]
})
export class UserModule {}