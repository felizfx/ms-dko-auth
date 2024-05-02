/* eslint-disable @typescript-eslint/no-explicit-any */
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { ClassConstructor, plainToClass } from "class-transformer";
import { Observable, map } from "rxjs";

export class SerializeInterceptor implements NestInterceptor{
	constructor (
        private readonly dto: ClassConstructor<unknown>
	) {}

	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		return next.handle().pipe(
			map((data: any) => {
				return plainToClass(this.dto, data, {
					excludeExtraneousValues: true
				});
			})
		);
	}

}