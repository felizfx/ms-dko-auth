import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import * as fs from "fs";
import { join } from "path";

@Injectable()
export class EmailService {
	constructor(private readonly mailerService: MailerService) {}

	async sendNewPasswordMail(to: string, userName: string,token: string): Promise<void> {
		const viewPath = join(__dirname, "../../", "views");
		const template = fs.readFileSync(`${viewPath}/new-password.html`, "utf8");
		const html = template
			.replace("{name}", userName)
			.replace("{token}", token);

		await this.mailerService.sendMail({
			to,
			subject: "Alterção de senha",
			html
		});
	}
}
