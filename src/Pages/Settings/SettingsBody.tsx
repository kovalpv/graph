import React from "react";
import { Popover } from "react-bootstrap";

import ThemeSelect from "./ThemeSelect";

const SettingsBody: React.FunctionComponent = () => (
  <Popover data-testid="settings-body">
    <Popover.Header as="h3">Sidebar Style</Popover.Header>
    <Popover.Body>
      <p className="h6">Select theme</p>
      <ThemeSelect />
    </Popover.Body>
  </Popover>
);

export default SettingsBody;
