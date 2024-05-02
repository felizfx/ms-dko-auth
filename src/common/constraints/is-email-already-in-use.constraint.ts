import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { User } from "src/modules/user/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailAlreadyinUseConstraint implements ValidatorConstraintInterface {
	constructor (
        @InjectRepository(User)
        private readonly userRespository: Repository<User>
	) {}
    
	async validate(value: string): Promise<boolean> {
		return !(await this.userRespository.findOneBy({ email: value }));
	}

	defaultMessage?(): string {
		return "The email '$value' is already in use";
	}
    
}