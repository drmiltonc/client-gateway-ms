import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, PaginationOrderDto, UpdateOrderDto } from './dto';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {

    try {

      const order = await firstValueFrom(this.client.send('createOrder', createOrderDto));
      return order;
      
    } catch (e) {
      throw new RpcException(e);
    }
  }

  @Get()
  async findAll(@Query() paginationOrderDto: PaginationOrderDto) {
    

    try {
      const orders = await firstValueFrom(this.client.send('findAllOrders', paginationOrderDto ));
    return orders;
    } catch (e) {
      throw new RpcException(e);
    }
  }
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {

    try {
      const order = await this.client.send('findOneOrder', { id });
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
      const order =  this.client.send('changeOrderStatus', { id, status: updateOrderDto.status });
      return order;
    } catch (e) {
      throw new RpcException(e);

    }
  }



}
