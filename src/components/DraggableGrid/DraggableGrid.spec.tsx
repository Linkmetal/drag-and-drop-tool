import { render, screen } from "@testing-library/react";

import { DraggableGrid } from "./DraggableGrid";

describe("DraggableGrid", () => {
  it("renders properly", () => {
    render(<DraggableGrid products={[]} />);

    expect(screen.getByText("A")).toBeInTheDocument();
  });
});
