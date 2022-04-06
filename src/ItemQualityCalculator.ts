import { Item } from "./index";
export interface ItemQualityCalculatorStrategy {
  calculate(item: Item): Item;
}
export class NormalItemQualityCalculatorStrategy
  implements ItemQualityCalculatorStrategy {
  calculate(item: Item): Item {
    throw new Error("Method not implemented.");
  }
}
