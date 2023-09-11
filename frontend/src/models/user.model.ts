import {Sushi} from "./sushi.model";

export class User {
  firstName: string;
  lastName: string;
  address: {
    street: string;
    houseNumber: string;
    city: string;
    postalCode: string;
  };
  eMail: string;
  password: string;
  favoriteSushi: Sushi[];

  constructor(
    firstName: string,
    lastName: string,
    address: {
      street: string;
      houseNumber: string;
      city: string;
      postalCode: string;
    },
    eMail: string,
    password: string,
  favoriteSushi: Sushi[]
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.eMail = eMail;
    this.password = password;
    this.favoriteSushi = favoriteSushi;
  }
}
