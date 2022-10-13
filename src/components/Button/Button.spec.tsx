import { render, screen, userEvent } from "tests/appTestUtils";

import Button from "./Button";

describe("Button", () => {
  it("renders properly", () => {
    render(<Button label="button" onClick={jest.fn()} />);

    expect(screen.getByText("button")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClickMock = jest.fn();
    render(<Button label="button" onClick={onClickMock} />);

    userEvent.click(screen.getByText("button"));

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("does not show label when onlyIcon is setted to true", () => {
    render(<Button label="button" onClick={jest.fn()} onlyIcon />);

    expect(screen.queryByText("button")).not.toBeInTheDocument();
  });
});
