/* eslint-disable indent */
import { Expose } from "class-transformer";
import { UserInterface } from "../interfaces/user.interface";

export class UserDto implements UserInterface {
    @Expose()
	username: string;

    @Expose()
	email: string;

    password: string;

    @Expose()
	role: string;

    token: string;

    tokenDate: Date;
}