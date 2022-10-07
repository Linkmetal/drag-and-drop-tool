import { render, screen, userEvent } from "tests/appTestUtils";

import { DraggableRow } from "./DraggableRow";
import { gridFixture } from "fixtures/Grid";
import { productsFixture } from "fixtures/Products";
import { templatesFixture } from "fixtures/Templates";

describe("DraggableRow", () => {
  it("renders properly", () => {
    render(
      <DraggableRow
        row={gridFixture.rows[0]}
        itemsIds={gridFixture.rows[0].productIds}
        onRemoveRow={() => undefined}
        onTemplateChange={() => undefined}
        products={productsFixture.slice(0, 3)}
      />
    );

    expect(screen.getByText(productsFixture[0].name)).toBeInTheDocument();
    expect(screen.getByText(productsFixture[1].name)).toBeInTheDocument();
    expect(screen.getByText(productsFixture[2].name)).toBeInTheDocument();
  });

  it("calls onRemoveRow on delete row button", () => {
    const onRemoveRowMock = jest.fn();

    render(
      <DraggableRow
        row={gridFixture.rows[0]}
        itemsIds={gridFixture.rows[0].productIds}
        onRemoveRow={onRemoveRowMock}
        onTemplateChange={() => undefined}
        products={productsFixture.slice(0, 3)}
      />
    );

    userEvent.click(screen.getByLabelText("Delete row"));

    expect(onRemoveRowMock).toHaveBeenCalledWith(gridFixture.rows[0].id);
  });

  it("calls onTemplateChange on template selection", async () => {
    const onTemplateChangeMock = jest.fn();

    render(
      <DraggableRow
        row={gridFixture.rows[0]}
        itemsIds={gridFixture.rows[0].productIds}
        onRemoveRow={() => undefined}
        onTemplateChange={onTemplateChangeMock}
        products={productsFixture.slice(0, 3)}
      />
    );

    userEvent.selectOptions(screen.getByLabelText("Select template"), "CENTER");

    expect(onTemplateChangeMock).toHaveBeenCalledWith(
      gridFixture.rows[0].id,
      templatesFixture[0].id
    );
  });
});
