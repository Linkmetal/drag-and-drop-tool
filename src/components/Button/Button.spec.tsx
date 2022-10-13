import { render, screen } from "tests/appTestUtils";

import Button from "./Button";

describe("ProductCard", () => {
  it("renders properly", () => {
    render(<Button label="a" onClick={jest.fn()} />);
  });
});
