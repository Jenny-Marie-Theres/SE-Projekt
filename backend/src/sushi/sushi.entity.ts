import { Column, Entity, ObjectIdColumn } from 'typeorm';
@Entity('sushi')
export class Sushi {
  @ObjectIdColumn()
  _id: string;
  @Column()
  name: string;
  @Column()
  fillings: FillingOption[];
  @Column()
  outside: Outside;
  @Column()
  sauce: Sauce;
  @Column()
  fried: boolean;
}

export enum Sauce {
  PONZU = 'Ponzu',
  MAYONNAISE = 'Mayonnaise',
  SOY_SAUCE = 'Soya',
  TERIYAKI = 'Teriyaki',
  WASABI = 'Wasabi',
  NONE = '-',
}

export enum Outside {
  SESAME = 'Sesam',
  NORI = 'Nori',
  NONE = '-',
}

export enum FillingOption {
  SALMON = 'Lachs',
  TUNA = 'Thunfisch',
  CUCUMBER = 'Gurke',
  AVOCADO = 'Avocado',
  CREAM_CHEESE = 'Frischkäse',
  PEPPER = 'Paprika',
  NONE = '-',
}
