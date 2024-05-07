import { ClassConstructor } from "class-transformer";

export class ApiResponseDto {
	status: number;
	data: ClassConstructor<unknown>;
}