import { INestApplication, Injectable } from "@nestjs/common";
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";

@Injectable()
export class SwaggerConfigService {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	build(mainModule: any, app: INestApplication, path: string): void {
		const config = new DocumentBuilder()
			.setTitle("Nest Structure API")
			.setDescription("API for studies")
			.setVersion("1.0")
			.addBearerAuth({ type: "http", scheme: "bearer", bearerFormat: "JWT", in: "header" }, "bearer")
			.addSecurityRequirements("bearer")
			.build();
		const options: SwaggerDocumentOptions = {
			include: [mainModule],
			deepScanRoutes: true
		};
		const document = SwaggerModule.createDocument(app, config, options);
		SwaggerModule.setup(path, app, document);
	}
}