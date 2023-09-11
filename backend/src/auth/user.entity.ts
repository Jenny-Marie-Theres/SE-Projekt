import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Sushi } from '../sushi/sushi.entity';

@Entity('user')
export class User {
  @ObjectIdColumn()
  _id: string;
  @Column()
  lastName: string;
  @Column()
  firstName: string;
  @Column()
  eMail: string;
  @Column()
  password: string;
  @Column()
  address: {
    street: string;
    houseNumber: string;
    city: string;
    postalCode: string;
  };
  @Column()
  role = 'user';
  @Column()
  favoriteSushi: Sushi[];
}
