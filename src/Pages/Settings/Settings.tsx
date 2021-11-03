import React, { useRef } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";

import ThemeSelect from "./ThemeSelect";

import "./Settings.css";

const SettingsBody = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Sidebar Style</Popover.Header>
    <Popover.Body>
      <p className="h6">Select theme</p>
      <ThemeSelect />
    </Popover.Body>
  </Popover>
);

const Settings: React.FunctionComponent = () => {
  const target = useRef(null);

  return (
    <div className="settings-plugin">
      <OverlayTrigger
        trigger="click"
        placement="left"
        overlay={SettingsBody}
        rootClose
      >
        <Button variant="link" ref={target} className="settings-plugin__button">
          <i className="fa fa-cog fa-4x"> </i>
        </Button>
      </OverlayTrigger>
    </div>
  );
};

export default Settings;
