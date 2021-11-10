import React from "react";

import { fireEvent, render } from "@testing-library/react";

import Settings from "./Settings";

describe("Settings", () => {
  test("should 'setting-body' hide by default", () => {
    const { getByTestId, queryByTestId } = render(<Settings />);
    expect(getByTestId("settings-btn")).toBeInTheDocument();
    expect(getByTestId("settings-icon")).toBeInTheDocument();
    expect(queryByTestId("settings-body")).not.toBeInTheDocument();
  });

  test("should 'setting-body' show after click 'settings-btn'", () => {
    const { getByTestId, queryByTestId } = render(<Settings />);

    const settingsBtn = getByTestId("settings-icon");

    fireEvent.click(settingsBtn);

    expect(queryByTestId("settings-body")).toBeInTheDocument();
  });
});
