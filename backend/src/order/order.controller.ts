import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './create-order.dto';
import { Order, Status } from './order.entity';
import { ObjectId } from 'mongodb';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  // bestellung erstelle
  @Post('/create')
  createOrder(@Body() orderDTO: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(orderDTO);
  }

  //alle bestellungen
  @Get('/all')
  async getOrdersAll(): Promise<Order[]> {
    return this.orderService.getOrdersAll();
  }
  //alle bestellungen die den Status in Progress haben
  @Get('/in-process')
  async getOrdersInProcess(): Promise<Order[]> {
    return this.orderService.getOrdersInProcess();
  }

  //alle bestellungen die den Status eingang haben
  @Get('/received')
  async getOrdersRECEIVED(): Promise<Order[]> {
    return this.orderService.getOrdersRECEIVED();
  }
  //bestellung mit id finden
  @Get('/byId/:id')
  async getOrderById(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOrderById(new ObjectId(id));
  }
  // Status ändern
  @Put('/update-status/:status')
  async updateOrderStatus(
    @Param('status') newStatus: Status,
    @Body() order: Order,
  ): Promise<Order> {
    return this.orderService.updateOrderStatus(
      new ObjectId(order._id),
      newStatus,
    );
  }

  @Delete('/delete/:id')
  deleteOrder(@Param('id') id: string): Promise<void> {
    return this.orderService.deleteOrder(id);
  }
}
