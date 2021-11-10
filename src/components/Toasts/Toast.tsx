import React from "react";
import { Toast as ToastBootstrap } from "react-bootstrap";

interface ToastProps {
    readonly title: string;
    readonly message: string | React.ReactNode;
    readonly closeOnlyHuman?: boolean;
    readonly onClose?: () => void;
}

const Toast: React.FunctionComponent<ToastProps> = ({
  title, message, closeOnlyHuman, onClose
}) => (
  <ToastBootstrap
    style={{
      padding: 0,
      margin: "0 0 8px 0"
    }}
    data-testid="toasts-item"
    onClose={onClose}
    delay={4000}
    autohide={!closeOnlyHuman}
  >
    <ToastBootstrap.Header>
      <strong className="me-auto">{title}</strong>
    </ToastBootstrap.Header>
    <ToastBootstrap.Body
      style={{
        padding: 0,
        margin: 0
      }}
      className="d-flex justify-content-center"
    >
      {message}
    </ToastBootstrap.Body>
  </ToastBootstrap>
);

export default Toast;
