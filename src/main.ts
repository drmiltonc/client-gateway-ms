import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import envVars from './config/envs';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common';

async function main() {

  const logger = new Logger('Main Gateway');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // useGlobalPipes() aplica un pipe a todas las solicitudes entrantes.
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true activa la validación de la lista blanca, lo que significa que solo se permitirán las propiedades incluidas en la lista blanca.
      whitelist: true,
      // forbidNonWhitelisted: true prohíbe las propiedades que no están incluidas en la lista blanca.
      forbidNonWhitelisted: true,
    })
  );

  app.useGlobalFilters(new RpcCustomExceptionFilter());

  await app.listen(envVars.PORT);
  logger.log(`Environment: ${envVars.PORT}`)
}
main();
