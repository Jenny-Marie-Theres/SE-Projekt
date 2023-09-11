import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, Status } from './order.entity';
import { CreateOrderDto } from './create-order.dto';
import { SushiService } from '../sushi/sushi.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private readonly sushiService: SushiService,
  ) {}
  // bestellung erstelle
  async createOrder(orderDTO: CreateOrderDto): Promise<Order> {
    const { orderItems, address, lastName } = orderDTO;
    const order = new Order();
    let price = 0;
    order.orderItems = orderItems;
    order.address = address;
    order.lastName = lastName;

    for (const sushiItem of orderItems) {
      price =
        price +
        this.sushiService.calculatePriceOfOne(sushiItem.sushi) *
          sushiItem.count;
    }
    order.totalPrice = price;
    return await this.orderRepository.save(order);
  }

  //alle bestellungen die den Status in Progress haben
  async getOrdersAll(): Promise<Order[]> {
    return this.orderRepository.find({
      where: {},
    });
  }

  //alle bestellungen die den Status in Progress haben
  async getOrdersInProcess(): Promise<Order[]> {
    return this.orderRepository.find({
      where: { status: Status.IN_PROCESS },
    });
  }

  //alle bestellungen die den Status eingang haben
  async getOrdersRECEIVED(): Promise<Order[]> {
    return this.orderRepository.find({
      where: { status: Status.RECEIVED },
    });
  }

  //bestellung mit id finden
  async findOrderById(id: ObjectId): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { _id: id } });
    if (!order) {
      throw new NotFoundException('Bestellung nicht gefunden.');
    }
    return order;
  }
  // Status ändern
  async updateOrderStatus(id: ObjectId, newStatus: Status): Promise<Order> {
    // console.log(id);
    const order = await this.orderRepository.findOne({ where: { _id: id } });
    if (!order) {
      throw new NotFoundException('Bestellung nicht gefunden.');
    } else {
      order.status = newStatus;
      return this.orderRepository.save(order);
    }
  }

  // Order löschen
  async deleteOrder(id: string): Promise<void> {
    // Methode gibt ein Objekt zurück in de steht wie viele Daten betroffen sind
    const result = await this.orderRepository.delete(id);
    // wenn diese 0 sind dann hat es nicht gelöscht
    if (result.affected === 0) {
      throw new NotFoundException('Sushi not found');
    }
  }
}
