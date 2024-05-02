import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { isUUID } from "class-validator";

@Injectable()
export class UserService {
	constructor (
        @InjectRepository(User)
        public readonly userRespository: Repository<User>
	) {}

	async findUserByEmail(email: string) {
		const user = await this.userRespository.findOneBy({ email });
		if (!user) throw new NotFoundException("User not found");
		return user;
	}

	async createUser(data: CreateUserDto) {
		const user = this.userRespository.create({ ...data, role: "user" });
		return await this.userRespository.save(user);
	}

	async updateUser(id: string, attrs: Partial<User>) {
		if (!isUUID(id)) throw new BadRequestException("ID de usuario não corresponde ha um UUID");
		const user = await this.userRespository.findOneBy({ id });
		if (!user) throw new NotFoundException("User not found");
		Object.assign(user, attrs);
		return await this.userRespository.save(user);
	}
}