import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Sushi } from '../sushi/sushi.entity';

@Entity('admin')
export class Admin {
  @ObjectIdColumn()
  _id: string;
  @Column({ unique: true })
  eMail: string;
  @Column()
  password: string;
  @Column()
  role = 'admin';
  @Column()
  favoriteSushi: Sushi[];
}
