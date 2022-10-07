import { render, screen, userEvent } from "tests/appTestUtils";

import { DraggableGrid } from "./DraggableGrid";
import { gridFixture } from "fixtures/Grid";
import { productsFixture } from "fixtures/Products";

describe("DraggableGrid", () => {
  it("renders properly", () => {
    render(
      <DraggableGrid
        products={productsFixture.slice(0, 5)}
        grid={gridFixture}
        onGridChange={jest.fn()}
      />
    );

    expect(screen.getByText(productsFixture[0].name)).toBeInTheDocument();
    expect(screen.getAllByLabelText("Delete row")).toHaveLength(3);
  });

  it("can add a row", () => {
    const onGridChangeMock = jest.fn();
    render(
      <DraggableGrid
        products={productsFixture.slice(0, 5)}
        grid={gridFixture}
        onGridChange={onGridChangeMock}
      />
    );

    userEvent.click(screen.getByText("Add row"));

    expect(screen.getAllByLabelText("Delete row")).toHaveLength(4);
  });

  it("can delete a row", () => {
    const onGridChangeMock = jest.fn();
    render(
      <DraggableGrid
        products={productsFixture.slice(0, 5)}
        grid={gridFixture}
        onGridChange={onGridChangeMock}
      />
    );

    userEvent.click(screen.getByText("Add row"));
    userEvent.click(screen.getAllByLabelText("Delete row")[3]);

    expect(screen.getAllByLabelText("Delete row")).toHaveLength(3);
  });

  it("calls onGridChange on grid action", () => {
    const onGridChangeMock = jest.fn();
    render(
      <DraggableGrid
        products={productsFixture.slice(0, 5)}
        grid={gridFixture}
        onGridChange={onGridChangeMock}
      />
    );

    userEvent.click(screen.getByText("Add row"));

    expect(onGridChangeMock).toHaveBeenCalled();
  });
});
