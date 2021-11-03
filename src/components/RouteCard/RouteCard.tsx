import React from "react";
import { Card } from "react-bootstrap";

interface RouteCardProps {
  readonly start: string;
  readonly end: string;
  readonly distance: number;
  readonly hasRoute: boolean;
}

const RouteCard: React.FunctionComponent<RouteCardProps> = ({
  start,
  end,
  distance,
  hasRoute,
}) => (
  <Card style={{ width: "18rem" }}>
    <Card.Body>
      <Card.Title>{hasRoute ? "" : "Route not found"}</Card.Title>
      <Card.Text>
        <p>
          Route from
          {" "}
          <strong>{start}</strong>
          {" "}
          to
          {" "}
          <strong>{end}</strong>
        </p>
        <p>
          Distance is equals
          {distance}
        </p>
      </Card.Text>
    </Card.Body>
  </Card>
);

export default RouteCard;
