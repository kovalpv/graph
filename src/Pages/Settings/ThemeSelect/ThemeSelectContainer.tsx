import React, { useContext } from "react";

import ThemeContext from "../ThemeContext";
import themes from "./themes";
import ThemeSelect from "./ThemeSelect";

const ThemeSelectContainer: React.FunctionComponent = () => {
  const { setTheme, theme } = useContext(ThemeContext);
  return <ThemeSelect theme={theme} setTheme={setTheme} themes={themes} />;
};

export default ThemeSelectContainer;
