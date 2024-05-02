/* eslint-disable indent */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UserSignInDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}