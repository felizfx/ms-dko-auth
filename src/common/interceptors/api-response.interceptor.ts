/* eslint-disable @typescript-eslint/no-explicit-any */
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { ApiResponseDto } from "../dtos/api-response.dto";
import { plainToClass } from "class-transformer";

export class ApiresponseIntercptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		return next.handle().pipe(
			map((data) => {
				const status = context.switchToHttp().getResponse().statusCode;
				return plainToClass(ApiResponseDto, { status, data });
			})
		);
	}
}