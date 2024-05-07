import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { AppConfigService } from "./config/app/configuration.service";
import { SwaggerConfigService } from "./config/swagger/configuration.service";
import { ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";
// import { ApiresponseIntercptor } from "./common/interceptors/api-response.interceptor";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const appConfig = app.get(AppConfigService);
	const swaggerConfig = app.get(SwaggerConfigService);

	app.enableCors();
	app.setGlobalPrefix("/api/v1");
	// app.useGlobalInterceptors(new ApiresponseIntercptor());
	app.useGlobalPipes(new ValidationPipe({
		whitelist: true
	}));
	useContainer(app.select(AppModule), { fallbackOnErrors: true });
	swaggerConfig.build(AppModule, app, "/");
	await app.listen(appConfig.port);
}

bootstrap();
