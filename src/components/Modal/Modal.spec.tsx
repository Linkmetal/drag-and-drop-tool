import { render, screen } from "@testing-library/react";

import { Modal } from "./Modal";
import userEvent from "@testing-library/user-event";

describe("Modal", () => {
  it("displays the default message", () => {
    render(
      <Modal children={<div>hello</div>} onClose={jest.fn()} open={true} />
    );

    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("is hidden when open is setted to false", () => {
    render(
      <Modal children={<div>hello</div>} onClose={jest.fn()} open={false} />
    );

    expect(screen.queryByText("hello")).not.toBeInTheDocument();
  });

  it("calls onClose on close button click", () => {
    const onCloseMock = jest.fn();

    render(
      <Modal children={<div>hello</div>} onClose={onCloseMock} open={true} />
    );

    userEvent.click(screen.getByLabelText("Close modal"));

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
