import React, { useCallback } from "react";
import { Form } from "react-bootstrap";

import { Node, NodeIdentifier } from "../../graph";

interface NodeSelectionProps {
  readonly title: string;
  readonly nodes: Node[];
  readonly selection?: NodeIdentifier;
  readonly select?: (selection?: NodeIdentifier) => void;
}

const EMPTY_VALUE = "EMPTY_VALUE";

const NodeSelection: React.FunctionComponent<NodeSelectionProps> = ({
  title,
  selection,
  select,
  nodes,
}) => {
  const change = useCallback<React.ChangeEventHandler<HTMLSelectElement>>(
    (e) => {
      select?.(EMPTY_VALUE === e.target.value ? undefined : e.target.value);
    },
    [select]
  );
  return (
    <Form.Select
      onChange={change}
      data-testid="node-select"
      defaultValue={selection ?? EMPTY_VALUE}
    >
      <option value={EMPTY_VALUE} data-testid="node-select-item">{title}</option>
      {nodes.map(({ id, title: nodeTitle }) => (
        <option
          key={`node-${id}`}
          value={id}
          data-testid="node-select-item"
        >
          {nodeTitle}
        </option>
      ))}
    </Form.Select>
  );
};

export default NodeSelection;
