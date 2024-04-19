import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config/services';
import envVars from 'src/config/envs';
import { env } from 'process';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      { name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envVars.PRODUCTS_MICROSERVICE_HOST,
          port: envVars.PRODUCTS_MICROSERVICE_PORT,
        }
      },
    ]),
  ]
})

export class ProductsModule { }
