import { Module } from "@nestjs/common";
import { SwaggerConfigService } from "./configuration.service";

@Module({
	providers: [SwaggerConfigService],
	exports: [SwaggerConfigService]
})
export class SwaggerConfigModule {}