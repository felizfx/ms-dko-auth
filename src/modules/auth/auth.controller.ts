/* eslint-disable no-mixed-spaces-and-tabs */
import { Body, Controller, HttpCode, HttpStatus, Post, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../user/dtos/create-user.dto";
import { UserSignInDto } from "./dtos/user-sign-in.dto";
import { isPublic } from "./decorators/isPublic.decorator";
import { HttpDescriptions } from "src/common/enums/http-descriptions.enum";
import { ChangePasswordDto } from "./dtos/change-password.dto";

@ApiTags("Auth")
@Controller("/auth")
@isPublic()
export class AuthController {
	constructor (
        private readonly authService: AuthService
	) {}
    
	@HttpCode(200)
    @Post("signin")
	@ApiResponse({ status: HttpStatus.OK, description: HttpDescriptions.OK })
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: HttpDescriptions.BAD_REQUEST })
	signIn(@Body() request: UserSignInDto) {
    	return this.authService.signIn(request);
	}

	@HttpCode(201)
    @Post("signup")
	@ApiResponse({ status: HttpStatus.CREATED, description: HttpDescriptions.CREATED })
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: HttpDescriptions.BAD_REQUEST })
	signUp(@Body() request: CreateUserDto) {
    	return this.authService.signUp(request);
	}

	@HttpCode(200)
	@Post("forgotpassword")
	@ApiResponse({ status: HttpStatus.OK, description: HttpDescriptions.OK })
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: HttpDescriptions.NOT_FOUND })
	forgotPassword(@Query("email") email: string) {
    	return this.authService.sendEmail(email);
	}

	@HttpCode(200)
	@Post("changepassword")
	@ApiResponse({ status: HttpStatus.OK, description: HttpDescriptions.OK })
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: HttpDescriptions.NOT_FOUND })
	changePassword(@Query("token") token: string, @Body() request: ChangePasswordDto) {
    	return this.authService.changePassword(token, request);
	}
}