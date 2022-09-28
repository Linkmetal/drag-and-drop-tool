import { FetchProducts } from "hooks/useFetchProducts";
import { productsFixture } from "fixtures/Products";

export const ProductRepository = {
  fetchProducts(params: FetchProducts.Params): Promise<FetchProducts.Response> {
    if (!params.prductsIds) return Promise.resolve(productsFixture);

    return Promise.resolve(
      productsFixture.filter((product) =>
        params.prductsIds?.includes(product.id)
      )
    );
  },
};
