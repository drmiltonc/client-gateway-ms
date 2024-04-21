import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';
import { ORDER_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, PaginationOrderDto, UpdateOrderDto } from './dto';
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
      const order = await this.ordersClient.send('findOneOrder', { id });
      return order;
    } catch (error) {
      throw new RpcException(error);

    }
  }

  @Patch(':id')
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto) {

    try {
      const order =  this.ordersClient.send('changeOrderStatus', { id, status: updateOrderDto.status });
      return order;
    } catch (e) {
      throw new RpcException(e);

    }
  }



}
