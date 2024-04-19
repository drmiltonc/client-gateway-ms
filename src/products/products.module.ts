// Importa el módulo 'Module' de la biblioteca NestJS.
import { Module } from '@nestjs/common';

// Importa el controlador de productos.
import { ProductsController } from './products.controller';

// Importa el módulo 'ClientsModule' y el transporte 'Transport' de la biblioteca NestJS para microservicios.
import { ClientsModule, Transport } from '@nestjs/microservices';

// Importa el nombre del servicio de productos desde el archivo de configuración.
import { PRODUCT_SERVICE } from 'src/config/services';

// Importa las variables de entorno desde el archivo de configuración.
import envVars from 'src/config/envs';

// Define el módulo de productos.
@Module({
  // Define los controladores del módulo.
  controllers: [ProductsController],

  // Define los proveedores del módulo.
  providers: [],

  // Define las importaciones del módulo.
  imports: [
    // Registra el cliente para el servicio de productos utilizando el transporte TCP.
    ClientsModule.register([
      {
        // Asigna el nombre del servicio al cliente.
        name: PRODUCT_SERVICE,

        // Establece el transporte como TCP.
        transport: Transport.TCP,

        // Establece las opciones de conexión para el cliente.
        options: {
          // Establece el host del servicio de productos.
          host: envVars.PRODUCTS_MICROSERVICE_HOST,

          // Establece el puerto del servicio de productos.
          port: envVars.PRODUCTS_MICROSERVICE_PORT,
        },
      },
    ]),
  ],
})

// Exporta el módulo de productos.
export class ProductsModule { }
