import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🛡️ Bind the Global Exception Filter
  app.useGlobalFilters(new GlobalExceptionFilter());

  const port = process.env.PORT || 4000;
  await app.listen(port);

  if (process.env.DEV_MODE === 'true') {
    console.log(
      `🚀 [DEV]: Server is live on http://localhost:${port}. (No bugs today 🎉)`,
    );
  }
}
bootstrap();
