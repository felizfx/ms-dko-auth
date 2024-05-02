/* eslint-disable indent */
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { CreateUserInterface } from "../interfaces/create-user.interface";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmailAlreadyinUse } from "src/common/decorators/is-email-already-in-use.decorator";

export class CreateUserDto implements CreateUserInterface {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(1, 15)
	username: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    @IsEmailAlreadyinUse()
	email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(4, 20)
	password: string;
}