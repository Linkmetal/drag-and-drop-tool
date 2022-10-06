import { render, screen } from "@testing-library/react";

import { DraggableRow } from "./DraggableRow";
import { Row } from "types/Grid";

describe("DraggableRow", () => {
  it("renders properly", () => {
    render(
      <DraggableRow
        row={{} as Row}
        handleRemove={() => undefined}
        products={[]}
      />
    );

    expect(screen.getByText("A")).toBeInTheDocument();
  });
});
