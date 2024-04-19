import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dto';
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
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all_products' }, paginationDto);
  }

  //añadir excepciones en caso de no encontrar un producto con el id especificado en el siguiente código
  @Get(':id')
  async findOneProduct(@Param('id') id: number) {
    try {
      const product = await firstValueFrom(this.productsClient.send({ cmd: 'find_one_product' }, { id }));
      return product;
    } catch (e) {
      throw new BadRequestException(e);
    }
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
