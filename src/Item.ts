export abstract class Item {
  protected readonly MAX_QUALITY = 50;
  protected readonly MIN_QUALITY = 0;
  public name: string;
  public sellIn: number;
  public quality: number;
  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
  public update() {
    this.updateSellIn();
    this.updateQuality();
  }
  protected abstract updateSellIn(): void;
  protected abstract updateQuality(): void;
}
export class AgedBrieItem extends Item {
  private readonly DOUBLE_INCREASE_THRESHOLD = 0;
  constructor(sellIn: number, quality: number) {
    super("Aged Brie", sellIn, quality);
  }
  protected updateSellIn(): void {
    this.sellIn--;
  }
  protected updateQuality(): void {
    this.quality++;
    if (
      this.sellIn < this.DOUBLE_INCREASE_THRESHOLD &&
      this.quality < this.MAX_QUALITY
    ) {
      this.quality++;
    }
  }
}
export class BackstagePassItem extends Item {
  private readonly LOSE_ALL_QUALITY_THRESHOLD = 0;
  private readonly DOUBLE_INCREASE_THRESHOLD = 10;
  private readonly TRIPLE_INCREASE_THRESHOLD = 5;
  constructor(sellIn: number, quality: number) {
    super("BackstagePass", sellIn, quality);
  }
  protected updateSellIn(): void {
    this.sellIn--;
  }
  protected updateQuality(): void {
    this.quality++;
    if (this.sellIn <= this.DOUBLE_INCREASE_THRESHOLD) {
      this.quality++;
    }
    if (this.sellIn <= this.TRIPLE_INCREASE_THRESHOLD) {
      this.quality++;
    }
    if (this.sellIn <= this.LOSE_ALL_QUALITY_THRESHOLD) {
      this.quality -= this.quality;
    }
  }
}
export class SulfurasItem extends Item {
  constructor(sellIn: number, quality: number) {
    super("Sulfuras, Hand of Ragnas", sellIn, quality);
  }
  protected updateSellIn(): void {}
  protected updateQuality(): void {}
}
export class NormalItem extends Item {
  private readonly LOSE_QUALITY_THRESHOLD = 0;
  protected updateSellIn(): void {
    this.sellIn--;
  }
  protected updateQuality(): void {
    this.quality--;
    if (
      this.sellIn <= this.LOSE_QUALITY_THRESHOLD &&
      this.quality > this.MIN_QUALITY
    ) {
      this.quality--;
    }
  }
}
