import { render, screen } from "@testing-library/react";

import { DraggableRow } from "./DraggableRow";

describe("DraggableRow", () => {
  it("renders properly", () => {
    render(
      <DraggableRow
        containerId="containerId"
        handleRemove={() => undefined}
        rowItems={[]}
      />
    );

    expect(screen.getByText("A")).toBeInTheDocument();
  });
});
