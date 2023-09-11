import {FillingOption, Outside, Sauce} from "./sushi.model";

export class SushiCount {
  name: string;
  fillings: FillingOption[];
  outside: Outside;
  sauce: Sauce;
  fried: boolean;
  count: number;

  constructor(
    name: string,
    fillings: FillingOption[],
    outside: Outside,
    sauce: Sauce,
    fried: boolean
  ) {
    this.name = name;
    this.fillings = fillings;
    this.outside = outside;
    this.sauce = sauce;
    this.fried = fried;
    this.count = 0;
  }
}
