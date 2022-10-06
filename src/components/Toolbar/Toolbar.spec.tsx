import { render, screen } from "@testing-library/react";

import { Toolbar } from "./Toolbar";

describe("Toolbar", () => {
  it("renders properly", () => {
    render(<Toolbar onSave={() => undefined} onHelp={() => undefined} />);

    expect(screen.getByText("A")).toBeInTheDocument();
  });
});
