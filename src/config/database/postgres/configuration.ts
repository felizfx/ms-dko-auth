import { registerAs } from "@nestjs/config";

export default registerAs("postgres", () => ({
	url: process.env.POSTGRES_DATABASE_URL,
}));