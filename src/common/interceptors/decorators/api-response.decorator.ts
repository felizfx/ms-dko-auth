import { UseInterceptors } from "@nestjs/common";
import { ApiresponseIntercptor } from "../api-response.interceptor";

export function SerializeApiResponse() {
	return UseInterceptors(new ApiresponseIntercptor());
}