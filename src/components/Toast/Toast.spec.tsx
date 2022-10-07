import { render, screen } from "@testing-library/react";

import React from "react";
import { Toast } from "./Toast";
import { ToastMessageProvider } from "contexts/ToastContext";

describe("Toast", () => {
  it("displays the default message", () => {
    render(
      <ToastMessageProvider>
        <Toast title="title" description="desciption" />
      </ToastMessageProvider>
    );

    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("description")).toBeInTheDocument();
  });
});
