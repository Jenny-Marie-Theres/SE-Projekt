import {SushiOrder} from "./sushi-order.model";

export class Order {
  orderItems: SushiOrder[];
  status: Status = Status.RECEIVED;
  totalPrice: number;
  address: {
    street: string;
    houseNumber: string;
    city: string;
    postalCode: string;
  };
  lastName: string;

  constructor(
     orderItems: SushiOrder[],
    status: Status = Status.RECEIVED,
     totalPrice: number,
    address: {
      street: string;
      houseNumber: string;
      city: string;
      postalCode: string;
    },
    lastName: string
  ) {
    this.orderItems = orderItems;
    this.status = status;
    this.totalPrice = totalPrice;
    this.address = address;
    this.lastName = lastName;
  }

}

export enum Status {
  FINISHED = 'Fertig',
  IN_PROCESS = 'In Bearbeitung',
  RECEIVED = 'Eingegangen',
}

