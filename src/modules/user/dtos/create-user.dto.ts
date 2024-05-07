/* eslint-disable indent */
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { CreateUserInterface } from "../interfaces/create-user.interface";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmailAlreadyinUse } from "src/common/decorators/is-email-already-in-use.decorator";

export class CreateUserDto implements CreateUserInterface {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(1, 15, {
        message: "Username precisa ter de 1 a 15 caracteres"
    })
	username: string;

    @ApiProperty()
    @IsEmail({
        host_blacklist: ["teste.com","teste.com.br"]
    }, {
        message: "O email inserido não é valido"
    })
    @IsNotEmpty()
    @IsEmailAlreadyinUse({
        message: "O email \"$value\" já está em uso"
    })
	email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(4, 20, {
        message: "A senha deve ter de 4 a 20 caracteres"
    })
	password: string;
}