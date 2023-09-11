import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Sushi } from '../sushi/sushi.entity';
import { ObjectId } from "mongodb";

@Entity('order')
export class Order {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column()
  orderItems: SushiOrder[];
  @Column()
  status: Status = Status.RECEIVED;
  @Column()
  totalPrice: number;
  @Column()
  address: {
    street: string;
    houseNumber: string;
    city: string;
    postalCode: string;
  };
  @Column()
  lastName: string;
}

export enum Status {
  FINISHED = 'Fertig',
  IN_PROCESS = 'In Bearbeitung',
  RECEIVED = 'Eingegangen',
}

export class SushiOrder {
  sushi: Sushi;
  count: number;
}
