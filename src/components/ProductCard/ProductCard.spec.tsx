import { render, screen } from "tests/appTestUtils";

import { ProductCard } from "./ProductCard";
import { numberToEuros } from "utils/money";
import { productsFixture } from "fixtures/Products";

describe("ProductCard", () => {
  it("renders properly", () => {
    render(<ProductCard product={productsFixture[0]} />);

    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      productsFixture[0].imageUrl
    );
    expect(screen.getByText(productsFixture[0].name)).toBeInTheDocument();
    expect(
      screen.getByText(numberToEuros(productsFixture[0].price))
    ).toBeInTheDocument();
  });
});
