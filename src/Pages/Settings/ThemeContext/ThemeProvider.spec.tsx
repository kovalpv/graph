/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useContext } from "react";

import { render } from "@testing-library/react";

import { ThemeContext } from "./ThemeContext";
import ThemeProvider from "./ThemeProvider";

const ConsumerComponent = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const click = useCallback(
    (e: any) => {
      setTheme(e.target.value);
    },
    [setTheme]
  );
  return (
    <div>
      <p data-testid="theme">{theme}</p>
      <button onClick={click} type="button">chamge theme</button>
    </div>
  );
};

describe("ThemeProvider", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
    jest.resetModules();
  });

  test("should rendere theme by default", () => {
    const { getByText } = render(<div>123</div>);

    expect(getByText(/123/)).toBeInTheDocument();
  });

  test("should render", () => {
    const { getByText } = render(<ThemeProvider><ConsumerComponent /></ThemeProvider>);

    expect(getByText(/default/)).toBeInTheDocument();
  });
});
