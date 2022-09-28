import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { Product } from "types/Product";
import { ProductRepository } from "network/repositories/ProductRepository";

export namespace FetchProducts {
  export type Params = {
    prductsIds?: string[];
  };
  export type Response = Product[];
  export type Error = string;
  export type Options = UseQueryOptions<Response, Error>;
}

const createKey = () => ["fetch-Products"];

const queryFetcher = (params: FetchProducts.Params) => () => {
  return ProductRepository.fetchProducts(params);
};

export const useFetchProducts = (
  params: FetchProducts.Params,
  options?: FetchProducts.Options
) => {
  const { data, ...rest } = useQuery<
    FetchProducts.Response,
    FetchProducts.Error
  >(createKey(), queryFetcher(params), options);

  return { products: data, ...rest };
};
