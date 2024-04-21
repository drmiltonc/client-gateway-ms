import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE } from 'src/config/services';
import envVars from 'src/config/envs';

@Module({
  controllers: [OrdersController],
  imports: [
    // Registra el cliente para el servicio de productos utilizando el transporte TCP.
    ClientsModule.register([
      {
        // Asigna el nombre del servicio al cliente.
        name: ORDER_SERVICE,

        // Establece el transporte como TCP.
        transport: Transport.TCP,

        // Establece las opciones de conexión para el cliente.
        options: {
          // Establece el host del servicio de productos.
          host: envVars.ORDER_MICROSERVICE_HOST,

          // Establece el puerto del servicio de productos.
          port: envVars.ORDER_MICROSERVICE_PORT
        },
      },
    ]),
  ],
})
export class OrdersModule {}
