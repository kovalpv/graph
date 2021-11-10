import { useCallback, useEffect, useState } from "react";

export default function useThemeState(): [
  string,
  React.Dispatch<React.SetStateAction<string>>
  ] {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ?? "default/bootstrap.min.css"
  );

  const changeTheme = useCallback(
    (newTheme) => {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    },
    [setTheme]
  );

  useEffect(() => {
    const file = `themes/${theme}`;
    let styleSheetTheme = document.getElementById("app-style-theme");
    const isDefaultFile = file.includes("default");
    if (isDefaultFile && styleSheetTheme) {
      document.head.removeChild(styleSheetTheme);
      return;
    }

    if (!styleSheetTheme && !isDefaultFile) {
      styleSheetTheme = document.createElement("link");
      styleSheetTheme.setAttribute("id", "app-style-theme");
      styleSheetTheme.setAttribute("rel", "stylesheet");
      styleSheetTheme.setAttribute("type", "text/css");
      document.head.appendChild(styleSheetTheme);
    }

    if (styleSheetTheme && styleSheetTheme.getAttribute("href") !== file) {
      styleSheetTheme.setAttribute("href", file);
    }
  }, [theme]);

  return [theme, changeTheme];
}
