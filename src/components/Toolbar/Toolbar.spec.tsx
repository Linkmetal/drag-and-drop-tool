import { render, screen, userEvent } from "tests/appTestUtils";

import { Toolbar } from "./Toolbar";

describe("Toolbar", () => {
  it("renders properly", () => {
    render(<Toolbar onSave={() => undefined} onHelp={() => undefined} />);

    expect(screen.getByText("Save Grid")).toBeInTheDocument();
    expect(screen.getByText("Help")).toBeInTheDocument();
  });

  it("calls onSave on Save button click", () => {
    const onSaveMock = jest.fn();

    render(<Toolbar onSave={onSaveMock} onHelp={() => undefined} />);

    userEvent.click(screen.getByText("Save Grid"));

    expect(onSaveMock).toHaveBeenCalled();
  });

  it("calls onHelp on Help button click", () => {
    const onHelpMock = jest.fn();

    render(<Toolbar onHelp={onHelpMock} onSave={() => undefined} />);

    userEvent.click(screen.getByText("Help"));

    expect(onHelpMock).toHaveBeenCalled();
  });
});
