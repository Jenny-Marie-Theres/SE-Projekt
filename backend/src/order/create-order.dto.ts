import { SushiOrder } from './order.entity';
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
export class CreateOrderDto {
  orderItems: SushiOrder[];
  @IsNotEmpty()
  address: {
    street: string;
    houseNumber: string;
    city: string;
    postalCode: string;
  };
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  lastName: string;

}
