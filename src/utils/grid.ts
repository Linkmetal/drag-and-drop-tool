import { Grid, Row } from "types/Grid";

import { Product } from "types/Product";
import { UniqueIdentifier } from "@dnd-kit/core";
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

export const getItemsFromRows = (rows: Row[]) => {
  return rows.reduce(
    (acc, value) => ({
      ...acc,
      [value.id as UniqueIdentifier]: value.productIds as UniqueIdentifier[],
    }),
    {} as { [key: UniqueIdentifier]: UniqueIdentifier[] }
  );
};

export enum TemplateAlignmentToFlex {
  CENTER = "center",
  LEFT = "flex-start",
  RIGHT = "flex-end",
}
