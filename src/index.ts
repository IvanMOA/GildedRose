import { Item } from "./Item";
export class GildedRose {
  private items: Item[];
  constructor(items: Item[] = []) {
    this.items = items;
  }
  public updateQuality(): Item[] {
    this.items.forEach((item) => item.update());
    return this.items;
  }
}
