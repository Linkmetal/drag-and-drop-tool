import { Grid } from "types/Grid";
import { Product } from "types/Product";
import { nanoid } from "nanoid";

export const createGridFromProducts = (products: Product[]): Grid => {
  const grouppedIds: string[][] = [];
  let aux: string[] = [];

  products.map((product, index) => {
    aux.push(product.id);
    if (aux.length === 3) {
      grouppedIds.push(aux);
      aux = [];
    }
    return [];
  });

  return {
    id: nanoid(10),
    rows: grouppedIds.map((ids) => ({
      id: nanoid(10),
      productIds: ids,
      templateId: "",
    })),
  };
};

export enum TemplateAlignmentToFlex {
  CENTER = "center",
  LEFT = "flex-start",
  RIGHT = "flex-end",
}
