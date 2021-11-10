import React from "react";

import { render } from "@testing-library/react";

import SettingsBody from "./SettingsBody";

describe("SettingsBody", () => {
  test("should render SettingsBody", () => {
    const { getByText, getByTestId } = render(<SettingsBody />);

    expect(getByText(/Sidebar Style/)).toBeInTheDocument();
    expect(getByText(/Select theme/)).toBeInTheDocument();
    expect(getByTestId("theme-select")).toBeInTheDocument();
  });
});
