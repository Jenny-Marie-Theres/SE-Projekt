/* eslint-disable prettier/prettier */
import { FillingOption, Outside, Sauce } from './sushi.entity';

export class SushiDto {
  name: string;
  fillings: FillingOption[];
  outside: Outside;
  sauce: Sauce;
  fried: boolean;
}
