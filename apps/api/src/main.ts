import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Get environment variables
  const configService = app.get(ConfigService);
  const frontendUrl = configService.get("FRONTEND_URL") || "http://localhost:3000";

  // Enable CORS for frontend
  app.enableCors({
    origin: frontendUrl,
    credentials: true, // Allow cookies and auth headers
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
