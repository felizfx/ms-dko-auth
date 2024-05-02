/* eslint-disable indent */
import { IsEmail, IsEnum, IsOptional } from "class-validator";
import { UpdateUserInterface } from "../interfaces/update-user.interface";
import { IsEmailAlreadyinUse } from "src/common/decorators/is-email-already-in-use.decorator";
import { RolesEnum } from "src/common/enums/roles.enum";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto implements UpdateUserInterface{
    @ApiProperty()
    @IsEmail()
    @IsOptional()
    @IsEmailAlreadyinUse()
	email: string;

    @ApiProperty()
    @IsEnum(RolesEnum)
    @IsOptional()
	role: string;
}