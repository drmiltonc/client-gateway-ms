// Importa el módulo 'Module' de la biblioteca NestJS.
import { Module } from '@nestjs/common';

// Importa el controlador de productos.
import { ProductsController } from './products.controller';


// Importa el nombre del servicio de productos desde el archivo de configuración.

// Importa las variables de entorno desde el archivo de configuración.
import { NatsModule } from 'src/transports/nats.module';

// Define el módulo de productos.
@Module({
  // Define los controladores del módulo.
  controllers: [ProductsController],

  // Define los proveedores del módulo.
  providers: [],

  // Define las importaciones del módulo.
  imports: [
    
    NatsModule
  ],
})

// Exporta el módulo de productos.
export class ProductsModule { }
