import React from "react";

import { fireEvent, render } from "@testing-library/react";

import { Theme } from "./interfaces";
import ThemeSelect from "./ThemeSelect";

describe("ThemeSelect", () => {
  test("should render 0 options when themes is equals empty array", () => {
    const themes: Theme[] = [];
    const { queryAllByTestId } = render(<ThemeSelect themes={themes} />);

    const renderThemes = queryAllByTestId("theme-select-item") as HTMLOutputElement[];

    expect(renderThemes.length).toEqual(0);
  });

  test("should render 3 options when themes length is equals three", () => {
    const themes: Theme[] = [
      ["theme-1", "first theme"],
      ["theme-2", "second theme"],
      ["theme-3", "third theme"],
    ];
    const { queryAllByTestId } = render(<ThemeSelect themes={themes} />);

    const renderThemes = queryAllByTestId("theme-select-item") as HTMLOutputElement[];

    expect(renderThemes.length).toEqual(3);
  });

  test("should selection equals input selection identifier", () => {
    const themes: Theme[] = [
      ["theme-1", "first theme"],
      ["theme-2", "second theme"],
      ["theme-3", "third theme"],
    ];
    const { queryAllByTestId } = render(<ThemeSelect themes={themes} theme="second theme" />);

    const renderThemes = queryAllByTestId("theme-select-item") as HTMLOptionElement[];

    expect(renderThemes.length).toEqual(3);

    expect(renderThemes[0].selected).toBeFalsy();
    expect(renderThemes[1].selected).toBeTruthy();
    expect(renderThemes[2].selected).toBeFalsy();
  });

  test("should change theme 'second theme' => 'third theme' and call setTheme", () => {
    const themes: Theme[] = [
      ["theme-1", "first theme"],
      ["theme-2", "second theme"],
      ["theme-3", "third theme"],
    ];
    const setTheme = jest.fn();
    const { getByTestId, queryAllByTestId } = render(
      <ThemeSelect
        themes={themes}
        theme="second theme"
        setTheme={setTheme}
      />
    );

    fireEvent.change(getByTestId("theme-select"), { target: { value: "third theme" } });

    const renderThemes = queryAllByTestId("theme-select-item") as HTMLOptionElement[];

    expect(renderThemes.length).toEqual(3);

    expect(renderThemes[0].selected).toBeFalsy();
    expect(renderThemes[1].selected).toBeFalsy();
    expect(renderThemes[2].selected).toBeTruthy();

    expect(setTheme).toBeCalledWith("third theme");
  });
});
