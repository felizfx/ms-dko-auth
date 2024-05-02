/* eslint-disable @typescript-eslint/ban-types */
import { Body, Controller, Get, HttpStatus, Param, Patch, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { Roles } from "../auth/decorators/roles.decorator";
import { RolesGuard } from "src/common/guards/roles.guard";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { User } from "./decorators/current-user.decorator";
import { Serialize } from "src/common/interceptors/decorators/serialize.decorator";
import { UserDto } from "./dtos/user.dto";
import { HttpDescriptions } from "src/common/enums/http-descriptions.enum";

@ApiTags("User")
@Controller("user")
@UseGuards(RolesGuard)
@Serialize(UserDto)
export class UserController {
	constructor (
        private readonly userService: UserService
	) {}

	@Get()
	whoami(@User() user: Object) {
		return user;
	}

	@Patch(":id")
	@Roles("admin")
	@ApiResponse({ status: HttpStatus.OK, description: HttpDescriptions.OK })
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: HttpDescriptions.BAD_REQUEST })
	@ApiResponse({ status: HttpStatus.FORBIDDEN, description: HttpDescriptions.FORBIDDEN })
	updateUser(@Param("id") id: string, @Body() request: UpdateUserDto) {
		return this.userService.updateUser(id, request);
	}
}