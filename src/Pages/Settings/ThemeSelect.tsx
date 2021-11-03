import React, { useCallback } from "react";
import { Form } from "react-bootstrap";

import { ThemeConsumer } from "./ThemeContext";

const themes: [string, string][] = [
  ["default", "default/bootstrap.min.css"],
  ["cerulean", "cerulean/bootstrap.min.css"],
  ["cosmo", "cosmo/bootstrap.min.css"],
  ["cyborg", "cyborg/bootstrap.min.css"],
  ["darkly", "darkly/bootstrap.min.css"],
  ["flatly", "flatly/bootstrap.min.css"],
  ["journal", "journal/bootstrap.min.css"],
  ["litera", "litera/bootstrap.min.css"],
  ["lumen", "lumen/bootstrap.min.css"],
  ["lux", "lux/bootstrap.min.css"],
  ["materia", "materia/bootstrap.min.css"],
  ["minty", "minty/bootstrap.min.css"],
  ["morph", "morph/bootstrap.min.css"],
  ["pulse", "pulse/bootstrap.min.css"],
  ["quartz", "quartz/bootstrap.min.css"],
  ["sandstone", "sandstone/bootstrap.min.css"],
  ["simplex", "simplex/bootstrap.min.css"],
  ["sketchy", "sketchy/bootstrap.min.css"],
  ["slate", "slate/bootstrap.min.css"],
  ["solar", "solar/bootstrap.min.css"],
  ["spacelab", "spacelab/bootstrap.min.css"],
  ["superhero", "superhero/bootstrap.min.css"],
  ["united", "united/bootstrap.min.css"],
  ["vapor", "vapor/bootstrap.min.css"],
  ["yeti", "yeti/bootstrap.min.css"],
  ["zephyr", "zephyr/bootstrap.min.css"],
];

interface ThemeSelectProps {
  readonly theme: string;
  readonly setTheme: (theme: string) => void;
}

const ThemeSelect: React.FunctionComponent<ThemeSelectProps> = ({
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
    <Form.Select value={theme} onChange={change}>
      {themes.map(([themeName, file]) => (
        <option key={`theme-${themeName}`} value={file}>
          {themeName}
        </option>
      ))}
    </Form.Select>
  );
};

const ThemeSelectContainer = () => (
  <ThemeConsumer
    render={({ theme, setTheme }) => (
      <ThemeSelect theme={theme} setTheme={setTheme} />
    )}
  />
);

export default ThemeSelectContainer;
