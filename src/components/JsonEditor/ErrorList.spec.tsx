import React from "react";

import { render } from "@testing-library/react";

import ErrorList, { ValidateError } from "./ErrorList";

describe("ErrorList", () => {
  test("should render empty list", () => {
    const { queryAllByRole } = render(<ErrorList errors={[]} />);

    const renderItems = queryAllByRole("listitem");
    expect(renderItems.length).toEqual(0);
  });

  test("should render three elements", () => {
    const errors: ValidateError[] = [
      {
        id: 1,
        message: "first some error"
      },
      {
        id: 2,
        message: "second error"
      },
      {
        id: 3,
        message: "third error"
      }
    ];
    const { getByText, queryAllByTestId } = render(<ErrorList errors={errors} />);

    const renderItems = queryAllByTestId("listitem");

    expect(renderItems.length).toEqual(3);

    expect(getByText(/first some error/)).toBeInTheDocument();
    expect(getByText(/second error/)).toBeInTheDocument();
    expect(getByText(/third error/)).toBeInTheDocument();
  });
});
