import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { ORDER_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, PaginationOrderDto } from './dto';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto);
  }

  @Get()
  findAll(@Query() paginationOrderDto: PaginationOrderDto) {
    const orders = this.ordersClient.send('findAllOrders', paginationOrderDto );
    return orders;
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {

    try {
      const order = await firstValueFrom(this.ordersClient.send('findOneOrder', { id }));
      return order;
    } catch (error) {
      throw new RpcException(error);
    }

  }


}
