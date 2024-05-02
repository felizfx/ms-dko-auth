import { ValidationOptions, registerDecorator } from "class-validator";
import { IsEmailAlreadyinUseConstraint } from "../constraints/is-email-already-in-use.constraint";

export function IsEmailAlreadyinUse(validationOptions?: ValidationOptions) {
	// eslint-disable-next-line @typescript-eslint/ban-types
	return function (object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsEmailAlreadyinUseConstraint,
		});
	};
}