// Importa los decoradores y funciones necesarios de la biblioteca NestJS.
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

// Importa el DTO de paginación personalizado.
import { PaginationDto } from 'src/common';

// Importa los DTOs de creación y actualización de productos.
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// Importa el nombre del servicio de productos desde el archivo de configuración.
import { NATS_SERVICE } from 'src/config/services';

// Define el controlador de productos.
@Controller('products')
export class ProductsController {
  // Inyecta el cliente proxy para el servicio de productos.
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) { }

  // Crea un nuevo producto.
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    // Envía un mensaje al servicio de productos para crear un nuevo producto.
    return this.client.send(
      { cmd: 'create_product' },
      createProductDto,
    );
  }

  // Obtiene todos los productos.
  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    // Envía un mensaje al servicio de productos para obtener todos los productos.
    return this.client.send(
      { cmd: 'find_all_products' },
      paginationDto,
    );
  }

  // Obtiene un producto por su ID.
  @Get(':id')
  async findOne(@Param('id') id: string) {
    // Envía un mensaje al servicio de productos para obtener un producto por su ID.
    return this.client.send({ cmd: 'find_one_product' }, { id }).pipe(
      // Captura cualquier error y lo lanza como una excepción RPC.
      catchError((err) => {
        throw new RpcException(err);
      }),
    );

  }

  // Elimina un producto por su ID.
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    // Envía un mensaje al servicio de productos para eliminar un producto por su ID.
    return this.client.send({ cmd: 'delete_product' }, { id }).pipe(
      // Captura cualquier error y lo lanza como una excepción RPC.
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  // Actualiza un producto por su ID.
  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    // Envía un mensaje al servicio de productos para actualizar un producto por su ID.
    return this.client
      .send(
        { cmd: 'update_product' },
        {
          id,
          ...updateProductDto,
        },
      )
      .pipe(
        // Captura cualquier error y lo lanza como una excepción RPC.
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
