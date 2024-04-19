import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config/services';

@Controller('products')
export class ProductsController {

  constructor(@Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy) {

  }

  @Post()
  createProduct() {
    return 'Crea un producto';
  }

  @Get()
  findAllProducts() {
    return this.productsClient.send({ cmd: 'find_all_products' }, {});
  }

  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return 'Esta función regresa un producto con el ID ' + id;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return 'Esta función elimina el producto con el ID ' + id;
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('id') body: any) {
    return 'Esta función actualiza el producto con el ID ' + id;
  }
}
