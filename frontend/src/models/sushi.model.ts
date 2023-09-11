export enum Sauce {
  PONZU = 'Ponzu',
  MAYONNAISE = 'Mayonnaise',
  SOY_SAUCE = 'Soya',
  TERIYAKI = 'Teriyaki',
  WASABI = 'Wasabi',
  NONE = '-'
}

export enum Outside {
  SESAME = 'Sesam',
  NORI = 'Nori',
  NONE = '-'
}

export enum FillingOption {
  SALMON = 'Lachs',
  TUNA = 'Thunfisch',
  CUCUMBER = 'Gurke',
  AVOCADO = 'Avocado',
  CREAM_CHEESE = 'Frischkäse',
  PEPPER = 'Paprika',
  NONE = '-'
}

export class Sushi {
  name: string;
  fillings: FillingOption[];
  outside: Outside;
  sauce: Sauce;
  fried: boolean;


  constructor(
    name: string,
    fillings: FillingOption[],
    outside: Outside,
    sauce: Sauce,
    fried: boolean,

  ) {
    this.name = name;
    this.fillings = fillings;
    this.outside = outside;
    this.sauce = sauce;
    this.fried = fried;

  }
}
