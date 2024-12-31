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
  formula_car = "Formula Car",
  sports_car = "Sports Car",
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
  logo?: string;
  skuGroup?: { [key: string | number]: string };
  group?: number;
};
