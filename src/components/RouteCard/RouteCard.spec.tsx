import React from "react";

import { render } from "@testing-library/react";

import RouteCard from "./RouteCard";

describe("RouteCard", () => {
  test("should render card when route is found", () => {
    const { getByText } = render(
      <RouteCard start="1" end="2" distance={10} hasRoute />
    );

    expect(getByText(/route was found/i)).toBeInTheDocument();

    expect(getByText(/route from/i)).toBeInTheDocument();
    expect(getByText(/Distance is equals(.*)10/i)).toBeInTheDocument();
  });

  test("should render card when route is not found", () => {
    const { getByText, queryByText } = render(
      <RouteCard start="1" end="2" distance={10} hasRoute={false} />
    );

    expect(getByText(/route not found/i)).toBeInTheDocument();
    expect(queryByText(/Distance is equals/i)).not.toBeInTheDocument();
  });
});
