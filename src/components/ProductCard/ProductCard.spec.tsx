import { render, screen } from "@testing-library/react";

import { ProductCard } from "./ProductCard";
import { productsFixture } from "fixtures/Products";

describe("ProductCard", () => {
  it("renders properly", () => {
    render(<ProductCard product={productsFixture[0]} />);

    expect(screen.getByText("A")).toBeInTheDocument();
  });
});
