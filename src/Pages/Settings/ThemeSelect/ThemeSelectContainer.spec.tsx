import React from "react";

import { fireEvent, render } from "@testing-library/react";

import ThemeContext from "../ThemeContext";
import ThemeSelectContainer from "./ThemeSelectContainer";

describe("ThemeSelectContainer", () => {
  test("should render ThemeSelect with 26 themes and selected 'default/bootstrap.min.css'", () => {
    const theme = "default/bootstrap.min.css";
    const setTheme = jest.fn();

    const { getAllByTestId } = render(
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ThemeSelectContainer />
      </ThemeContext.Provider>
    );

    const renderedThemes = getAllByTestId("theme-select-item") as HTMLOptionElement[];

    expect(renderedThemes.length).toEqual(26);

    expect(renderedThemes[0].selected).toBeTruthy();
  });

  // eslint-disable-next-line max-len
  test("should change selected theme 'default/bootstrap.min.css' => 'solar/bootstrap.min.css'", () => {
    const theme = "default/bootstrap.min.css";
    const setTheme = jest.fn();

    const { getByTestId, getAllByTestId } = render(
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ThemeSelectContainer />
      </ThemeContext.Provider>
    );

    const renderedThemes = getAllByTestId("theme-select-item") as HTMLOptionElement[];
    fireEvent.change(getByTestId("theme-select"), { target: { value: "solar/bootstrap.min.css" } });

    expect(renderedThemes.length).toEqual(26);

    expect(renderedThemes[19].selected).toBeTruthy();
    expect(setTheme).toBeCalledWith("solar/bootstrap.min.css");
  });
});
