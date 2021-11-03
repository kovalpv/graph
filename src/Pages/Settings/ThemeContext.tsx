import React, { useCallback, useEffect, useState } from "react";

export type ThemeContextProps = {
  readonly theme: string;
  readonly setTheme: (theme: string) => void;
};

const ThemeContext = React.createContext<ThemeContextProps>({
  theme: "",
  setTheme: () => {
    throw new Error("not implemented");
  },
});

const ThemeProvider: React.FunctionComponent = ({ children }) => {
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

    if (file.includes("default") && styleSheetTheme) {
      document.head.removeChild(styleSheetTheme);
      return;
    }

    if (!styleSheetTheme) {
      styleSheetTheme = document.createElement("link");
      styleSheetTheme.setAttribute("id", "app-style-theme");
      styleSheetTheme.setAttribute("rel", "stylesheet");
      styleSheetTheme.setAttribute("type", "text/css");
      document.head.appendChild(styleSheetTheme);
    }

    if (styleSheetTheme.getAttribute("href") !== file) {
      styleSheetTheme.setAttribute("href", file);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

interface ThemeConsumerProps {
  readonly render: (props: ThemeContextProps) => React.ReactNode;
}

export const ThemeConsumer: React.FunctionComponent<ThemeConsumerProps> = ({
  render,
}) => <ThemeContext.Consumer>{render}</ThemeContext.Consumer>;

export default ThemeProvider;
