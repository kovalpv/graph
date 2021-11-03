import React from "react";
import { Alert, ListGroup, ListGroupItem } from "react-bootstrap";

export interface ValidateError {
  readonly id: number;
  readonly message: string;
}

interface ErrorsProps {
  readonly className: string;
  readonly errors: ValidateError[];
}

const ErrorList: React.FunctionComponent<ErrorsProps> = ({
  className,
  errors,
}) => (
  <div className={className}>
    <ListGroup>
      {errors.map(({ id, message }) => (
        <ListGroupItem key={`err-${id}`}>
          <Alert variant="danger">{message}</Alert>
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
);

export default ErrorList;
