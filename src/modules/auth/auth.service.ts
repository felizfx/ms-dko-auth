import { Injectable, NotFoundException, OnModuleInit, UnauthorizedException } from "@nestjs/common";
import { AuthConfigService } from "src/config/auth/configuration.service";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dtos/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { UserSignInDto } from "./dtos/user-sign-in.dto";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { ChangePasswordDto } from "./dtos/change-password.dto";
import { ProducerService } from "src/providers/queue/kafka/producer.service";
import { ConsumerService } from "src/providers/queue/kafka/consumer.service";

@Injectable()
export class AuthService implements OnModuleInit {
	constructor (
		private readonly userService: UserService,
        private readonly authConfiguration: AuthConfigService,
		private readonly jwtService: JwtService,
		private readonly consumerService: ConsumerService,
		private readonly producerService: ProducerService,
	) {}

	async signIn(data: UserSignInDto) {
		try {
			const user = await this.userService.findUserByEmail(data.email);
		
			if(!(await bcrypt.compare(data.password, user.password))) throw new Error();

			const payload = { 
				id: user.id, 
				username: user.username, 
				email: user.email, 
				role: user.role 
			};

			return {
				acess_token: await this.jwtService.signAsync(payload, {
					secret: this.authConfiguration.secret
				})
			};
		} catch {
			throw new UnauthorizedException("Email ou senha incorretos");
		}
	}

	async signUp(data: CreateUserDto) {
		const user = await this.userService.createUser(data);
		const payload = { 
			id: user.id, 
			username: user.username, 
			email: user.email, 
			role: user.role 
		};

		return {
			acess_token: await this.jwtService.signAsync(payload, {
				secret: this.authConfiguration.secret
			})
		};
	}

	async sendEmail(email: string) {
		try {
			const user = await this.userService.findUserByEmail(email);
			const token = crypto.randomBytes(12).toString("hex");
			const tokenDate = new Date();
			tokenDate.setMinutes(tokenDate.getMinutes() + 10);

			this.userService.updateUser(user.id, { token, tokenDate });

			this.sendEmailTopic(email, user.username.charAt(0).toUpperCase() + user.username.slice(1), token);
		} catch (e) {
			if (e instanceof NotFoundException) throw new NotFoundException(`User not found for the email ${email}`);
		}
	}

	async changePassword(token: string, changePasswordDto: ChangePasswordDto) {
		const user = await this.userService.findUserByEmail(changePasswordDto.email);
		if(!user.token) throw new UnauthorizedException("Token not regitred in user");
		if(user.tokenDate.getTime() < new Date().getTime()) throw new UnauthorizedException("Token invlido ou expirado");
		if(!(await bcrypt.compare(token, user.token))) throw new UnauthorizedException("Token incorreto");
		this.userService.updateUser(user.id, { password: changePasswordDto.password, token: null, tokenDate: null });
	}

	sendEmailTopic(email: string, username: string, token: string) {
		this.producerService.produce({
			topic: "forgot_password_email_sender",
			messages: [
				{ 
					value: JSON.stringify({
						email,
						username,
						token
					}) 
				},
			],
		});
	}

	async onModuleInit() {
		this.consumerService.consume(
			{
				topics: ["confirm_email_send"],
				groupId: "receive_confirmation_consumer"
			},
			{
				eachMessage: async ({ message }) => {
					console.log({
						value: message.value.toString(),
					});
				}
			}
		);
	}
}