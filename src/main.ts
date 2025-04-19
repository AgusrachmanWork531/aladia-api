import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

async function bootstrap() {

  // Create a new Nest application using the AppModule
  const app = await NestFactory.create(AppModule);

  // This function is used to validate input from the client
  // whitelist: true, means only fields that exist in the DTO will be accepted
  // forbidNonWhitelisted: true, means if there are fields that do not exist in the DTO, it will return an error
  // transform: true, means it will convert the input from the client to the appropriate data type according to the DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Enable CORS (Cross-Origin Resource Sharing) for the application
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? '*', // Allow all origins by default
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
  });

  // Set the global prefix for all routes
  app.setGlobalPrefix('api/v1');

  // Enable versioning for the application
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v1'
  });

  // Enable helmet for security
  app.use(helmet());

  // Enable rate limiting to prevent DDoS attacks
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  }));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
