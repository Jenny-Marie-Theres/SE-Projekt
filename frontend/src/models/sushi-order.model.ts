import {Sushi} from "./sushi.model";

export class SushiOrder {
  sushi: Sushi;
  count: number;

  constructor(sushi: Sushi, count: number) {
    this.sushi = sushi;
    this.count = count;
  }
}
