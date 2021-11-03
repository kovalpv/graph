import { GraphNode, GraphPath, PathIdentifier } from "./interfaces";

export default class PathImpl implements GraphPath {
  id: PathIdentifier;

  constructor(
    readonly start: GraphNode,
    readonly end: GraphNode,
    readonly distance: number
  ) {
    this.id = `${start.id}-${end.id}-${distance.toFixed(2)}`;
  }
}
