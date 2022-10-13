import { render, screen } from "@testing-library/react";

import { Modal } from "./Modal";

describe("Toast", () => {
  it("displays the default message", () => {
    render(
      <Modal children={<div>hello</div>} onClose={jest.fn()} open={false} />
    );

    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
