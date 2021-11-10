import React from "react";

import { ThemeContext } from "./ThemeContext";
import useThemeState from "./useLocalStorageTheme";

const ThemeProvider: React.FunctionComponent = ({ children }) => {
  const [theme, setTheme] = useThemeState();
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
