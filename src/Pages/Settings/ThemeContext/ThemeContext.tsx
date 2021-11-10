import React from "react";

export type ThemeContextProps = {
  readonly theme: string;
  readonly setTheme: React.Dispatch<React.SetStateAction<string>>
};

export const ThemeContext = React.createContext<ThemeContextProps>({} as ThemeContextProps);
