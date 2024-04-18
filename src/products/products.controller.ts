import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct() {
    return 'Crea un producto';
  }

  @Get()
  findAllProducts() {
    return 'Esta función regresa varios productos';
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
