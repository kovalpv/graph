import React, { useCallback } from "react";
import { Alert, ToastContainer } from "react-bootstrap";

import { ToastMessage } from "./interfaces";
import Toast from "./Toast";

interface ToastsProps {
  readonly messages: ToastMessage[];
  readonly closeToast: (id: number) => void;
}

const Toasts: React.FunctionComponent<ToastsProps> = ({
  messages,
  closeToast,
}) => {
  const close = useCallback(
    (id: number) => () => {
      closeToast(id);
    },
    [closeToast]
  );
  return (
    <ToastContainer position="bottom-end">
      {messages?.map(({
        id, title, message, closeOnlyHuman, isAlert,
      }) => (
        <Toast
          key={`toast-${id}`}
          title={title}
          message={isAlert ? (
            <Alert
              variant="danger"
              style={{
                padding: 8,
                margin: 0
              }}
            >
              {message}
            </Alert>
          ) : message}
          closeOnlyHuman={closeOnlyHuman}
          onClose={close(id)}
        />
      ))}
    </ToastContainer>
  );
};

export default Toasts;
