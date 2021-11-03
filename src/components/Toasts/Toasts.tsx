import React from "react";
import { Toast, ToastContainer, Alert } from "react-bootstrap";
import { ToastMessage } from "./interfaces";

interface ToastsProps {
  readonly messages: ToastMessage[];
  readonly closeToast: (id: number) => void;
}

const Toasts: React.FunctionComponent<ToastsProps> = ({
  messages,
  closeToast,
}) => (
  <ToastContainer position="bottom-end">
    {messages?.map(({
      id, title, message, closeOnlyHuman, isAlert,
    }) => (
      <Toast
        key={`toast-${id}`}
        style={{ padding: 0, margin: "0 0 8px 0" }}
        onClose={() => closeToast(id)}
        delay={4000}
        autohide={!closeOnlyHuman}
      >
        <Toast.Header>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body style={{ padding: 0, margin: 0 }} className="d-flex justify-content-center">
          {isAlert ? (
            <Alert variant="danger" style={{ padding: 8, margin: 0 }}>
              {message}
            </Alert>
          ) : (
            message
          )}
        </Toast.Body>
      </Toast>
    ))}
  </ToastContainer>
);

export default Toasts;
