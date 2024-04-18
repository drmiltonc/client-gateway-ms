import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import envVars from './config/envs';
import { Logger } from '@nestjs/common';

async function main() {

  const logger = new Logger('Main Gateway');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  
  await app.listen(envVars.PORT);
  logger.log(`Environment: ${envVars.PORT}`)
}
main();
