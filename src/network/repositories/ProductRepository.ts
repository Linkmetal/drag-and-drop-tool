import { FetchProducts } from "hooks/useFetchProducts";
import { productsFixture } from "fixtures/Products";

export const ProductRepository = {
  fetchProducts(params: FetchProducts.Params): Promise<FetchProducts.Response> {
    return Promise.resolve(
      productsFixture.filter((product) =>
        params.productIds?.includes(product.id)
      )
    );
  },
};
