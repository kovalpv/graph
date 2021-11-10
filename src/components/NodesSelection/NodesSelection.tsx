import React from "react";
import { Col, Row } from "react-bootstrap";

import { Node, NodeIdentifier } from "../../graph";
import NodeSelection from "./NodeSelection";

interface NodesSelectionProps {
  readonly nodes: Node[];
  readonly start?: NodeIdentifier;
  readonly selectStart?: (id?: NodeIdentifier) => void;
  readonly end?: NodeIdentifier;
  readonly selectEnd?: (id?: NodeIdentifier) => void;
}

const NodesSelection: React.FunctionComponent<NodesSelectionProps> = ({
  nodes,
  start,
  selectStart,
  end,
  selectEnd,
}) => (
  <Row>
    <Col>
      <NodeSelection
        title="start"
        nodes={nodes}
        select={selectStart}
        selection={start}
        data-testid="node-selection-start"
      />
    </Col>
    <Col>
      <NodeSelection
        title="finish"
        nodes={nodes}
        select={selectEnd}
        selection={end}
        data-testid="node-selection-end"
      />
    </Col>
  </Row>
);

export default NodesSelection;
