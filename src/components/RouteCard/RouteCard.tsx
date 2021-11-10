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
      <Card.Title>
        {hasRoute ? "Route was found" : "Route not found"}
      </Card.Title>

      <Card.Text>
        Route from
        {" "}
        <strong>{start}</strong>
        {" "}
        to
        {" "}
        <strong>{end}</strong>
      </Card.Text>
      {hasRoute ? (
        <Card.Text>
          Distance is equals
          {distance}
        </Card.Text>
      ) : null}
    </Card.Body>
  </Card>
);

export default RouteCard;
