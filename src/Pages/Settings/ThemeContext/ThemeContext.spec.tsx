/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useContext } from "react";

import { fireEvent, render } from "@testing-library/react";

import { ThemeContext } from "./ThemeContext";

const ConsumerComponent: React.FunctionComponent = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const click = useCallback(
    (e: any) => {
      setTheme(e.target.value);
    },
    [setTheme]
  );
  return (
    <div>
      <p>{theme}</p>
      <button onClick={click} type="button">chamge theme</button>
    </div>
  );
};

describe("ThemeContext", () => {
  test("should return 'default theme'", () => {
    const theme = "default theme";
    const setTheme = jest.fn();

    const { getByText } = render(
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ConsumerComponent />
      </ThemeContext.Provider>
    );
    expect(getByText(/default theme/)).toBeInTheDocument();
  });

  test("should change 'default theme' => 'new select theme'", () => {
    const theme = "default theme";
    const setTheme = jest.fn();

    const { getByRole } = render(
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ConsumerComponent />
      </ThemeContext.Provider>
    );

    fireEvent.click(getByRole("button"), { target: { value: "new select theme" } });

    expect(setTheme).toBeCalledWith("new select theme");
  });
});
