export type Grid = {
  id: string;
  rows: Row[];
};

export type Row = {
  id: string;
  productIds: string[];
  templateId: string;
};
