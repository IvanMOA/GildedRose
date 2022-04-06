import { GildedRose } from "./index";
import {
  AgedBrieItem,
  BackstagePassItem,
  NormalItem,
  SulfurasItem,
} from "./Item";

describe("Gilded Rose", () => {
  it("Degrades quality of a normal item twice as fast once the sell by date has passed", () => {
    const gildedRose = new GildedRose([new NormalItem("A normal item", 0, 10)]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0]?.quality).toBe(8);
    expect(updatedItems[0]?.sellIn).toBe(-1);
  });
  it("Does not allow the quality of an item to be negative", () => {
    const gildedRose = new GildedRose([
      new NormalItem("A normal item", 1, 1),
      new NormalItem("A normal item", 0, 1),
    ]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0]?.quality).toBe(0);
    expect(updatedItems[0]?.sellIn).toBe(0);
    expect(updatedItems[1]?.quality).toBe(0);
    expect(updatedItems[1]?.sellIn).toBe(-1);
  });
  it("Aged Brie increases its quality the older it gets", () => {
    const gildedRose = new GildedRose([
      new AgedBrieItem(-1, 2),
      new AgedBrieItem(10, 1),
    ]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0]?.quality).toBe(4);
    expect(updatedItems[0]?.sellIn).toBe(-2);
    expect(updatedItems[1]?.quality).toBe(2);
    expect(updatedItems[1]?.sellIn).toBe(9);
  });
  it("Aged Brie can't have a quality higher than 50", () => {
    const gildedRose = new GildedRose([new AgedBrieItem(-1, 49)]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0]?.quality).toBe(50);
    expect(updatedItems[0]?.sellIn).toBe(-2);
  });
  it("A backstage pass quality drops to 0 after the concert has passed", () => {
    const gildedRose = new GildedRose([new BackstagePassItem(0, 49)]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0]?.quality).toBe(0);
    expect(updatedItems[0]?.sellIn).toBe(-1);
  });
  it("A backstage pass increases its quality by 2 when there are 10 days or less until the conert", () => {
    const gildedRose = new GildedRose([new BackstagePassItem(10, 20)]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0]?.quality).toBe(22);
    expect(updatedItems[0]?.sellIn).toBe(9);
  });
  it("A backstage pass increases its quality by 3 when there are 5 days or less until the conert", () => {
    const gildedRose = new GildedRose([new BackstagePassItem(5, 20)]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0]?.quality).toBe(23);
    expect(updatedItems[0]?.sellIn).toBe(4);
  });
  it("Sulfuras never degrades", () => {
    const gildedRose = new GildedRose([new SulfurasItem(-100, 80)]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0]?.quality).toBe(80);
    expect(updatedItems[0]?.sellIn).toBe(-100);
  });
});
