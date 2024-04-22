// Importa el módulo 'Module' de la biblioteca NestJS.
import { Module } from '@nestjs/common';

// Importa el módulo 'ProductsModule' del archivo 'products.module.ts'.
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { NatsModule } from './transports/nats.module';

// Define la clase 'AppModule' como un módulo de NestJS.
@Module({
  // Importa el módulo 'ProductsModule' en el módulo 'AppModule'.
  imports: [ProductsModule, OrdersModule, NatsModule],
})
// Exporta la clase 'AppModule'.
export class AppModule {}

