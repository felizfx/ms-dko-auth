/* eslint-disable indent */
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { ChangePasswordInterface } from "../interfaces/change-password.interface";

export class ChangePasswordDto implements ChangePasswordInterface{
    @ApiProperty()
    @IsEmail()
	email: string;

    @ApiProperty()
    @IsString()
	password: string;
}