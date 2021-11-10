import React, { useCallback } from "react";
import { Form } from "react-bootstrap";

import { Theme } from "./interfaces";

interface ThemeSelectProps {
  readonly themes: Theme[];
  readonly theme?: string;
  readonly setTheme?: (theme: string) => void;
}

const ThemeSelect: React.FunctionComponent<ThemeSelectProps> = ({
  themes,
  theme,
  setTheme,
}) => {
  const change = useCallback(
    (e) => {
      setTheme(e.target.value);
    },
    [setTheme]
  );

  return (
    <Form.Select defaultValue={theme} onChange={change} data-testid="theme-select">
      {themes.map(([themeName, file]) => (
        <option key={`theme-${themeName}`} value={file} data-testid="theme-select-item">
          {themeName}
        </option>
      ))}
    </Form.Select>
  );
};

export default ThemeSelect;
