export type Grid = {
  id: string;
  row: Row[];
};

export type Row = {
  productIds: string[];
  templateId: string;
};
