import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipes } from './common/pipes/zod.validation.pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ZodValidationPipes());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
