// Importa el módulo NestFactory de la biblioteca NestJS.
import { NestFactory } from '@nestjs/core';

// Importa el módulo AppModule del archivo app.module.ts.
import { AppModule } from './app.module';

// Importa las variables de entorno del archivo envs.ts.
import envVars from './config/envs';

// Importa el registrador y el pipe de validación de la biblioteca NestJS.
import { Logger, ValidationPipe } from '@nestjs/common';

// Importa el filtro de excepciones personalizado del archivo rpc-custom-exception-filter.ts.
import { RpcCustomExceptionFilter } from './common';

// Define la función principal asíncrona.
async function main() {

  // Crea una nueva instancia del registrador con el nombre 'Main Gateway'.
  const logger = new Logger('Main Gateway');

  // Crea una nueva instancia de la aplicación NestJS utilizando el módulo AppModule.
  const app = await NestFactory.create(AppModule);

  // Establece el prefijo global para todas las rutas de la API.
  app.setGlobalPrefix('api');

  // Aplica el pipe de validación a todas las solicitudes entrantes.
  app.useGlobalPipes(
    new ValidationPipe({
      // Activa la validación de la lista blanca, lo que significa que solo se permitirán las propiedades incluidas en la lista blanca.
      whitelist: true,
      // Prohíbe las propiedades que no están incluidas en la lista blanca.
      forbidNonWhitelisted: true,
    })
  );

  // Aplica el filtro de excepciones personalizado a todas las solicitudes entrantes.
  app.useGlobalFilters(new RpcCustomExceptionFilter());

  // Inicia la aplicación NestJS en el puerto especificado en las variables de entorno.
  await app.listen(envVars.PORT);
  // Registra el puerto en el que se está ejecutando la aplicación.
  logger.log(`Environment: ${envVars.PORT}`)
}

// Llama a la función principal.
main();
