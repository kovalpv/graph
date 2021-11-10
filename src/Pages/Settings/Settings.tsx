import React, { useRef } from "react";
import { Button, OverlayTrigger } from "react-bootstrap";

import { OverlayChildren } from "react-bootstrap/Overlay";

import SettingsBody from "./SettingsBody";

import "./Settings.css";

const Settings: React.FunctionComponent = () => {
  const target = useRef(null);

  return (
    <div className="settings-plugin">
      <OverlayTrigger
        trigger="click"
        placement="left"
        overlay={SettingsBody as OverlayChildren}
        rootClose
      >
        <Button
          variant="link"
          ref={target}
          className="settings-plugin__button"
          data-testid="settings-btn"
        >
          <i className="fa fa-cog fa-4x" data-testid="settings-icon" />
        </Button>
      </OverlayTrigger>
    </div>
  );
};

export default Settings;
