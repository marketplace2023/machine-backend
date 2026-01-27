import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS para el frontend React
  app.enableCors({
    origin: 'http://localhost:5173', // Puerto por defecto de Vite
    credentials: true,
  });

  // Validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `🚀 Servidor corriendo en http://localhost:${process.env.PORT ?? 3000}`,
  );
}
bootstrap();
