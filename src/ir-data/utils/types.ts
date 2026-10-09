export enum ETrackCategories {
  all = "All",
  oval = "Oval",
  road = "Road",
  dirt_oval = "Dirt Oval",
  dirt_road = "Dirt Road",
}

export enum ECarCategories {
  all = "All",
  oval = "Oval",
  sports_car = "Sports Car",
  formula_car = "Formula Car",
  dirt_oval = "Dirt Oval",
  dirt_road = "Dirt Road",
}

export const Category = { ...ECarCategories, ...ETrackCategories };

export type TContent = {
  id: number;
  name: string;
  config?: string;
  categories: string[];
  free: boolean;
  price: number;
  sku: number;
  series?: number[];
  skuSeries?: number[];
  logo?: string;
  skuGroup?: { [key: string | number]: string };
  group?: number;
  week?: string;
};
