import { render, screen } from "@testing-library/react";

import { DraggableRow } from "./DraggableRow";
import { Row } from "types/Grid";

describe("DraggableRow", () => {
  it("renders properly", () => {
    render(
      <DraggableRow
        row={{} as Row}
        containerId="containerId"
        handleRemove={() => undefined}
        rowItemsIds={[]}
      />
    );

    expect(screen.getByText("A")).toBeInTheDocument();
  });
});
