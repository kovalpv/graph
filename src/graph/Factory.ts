import {
  GraphNode, NodeIdentifier, GraphPath, GraphTrail,
} from "./interfaces";
import NodeImpl from "./NodeImpl";
import PathImpl from "./PathImpl";
import TrailImpl from "./TrailImpl";

export default class Factory {
  static createNode(id: NodeIdentifier, title: string): GraphNode {
    return new NodeImpl(id, title);
  }

  static createPath(
    start: GraphNode,
    end: GraphNode,
    distance: number
  ): GraphPath {
    return new PathImpl(start, end, distance);
  }

  static createTrail(start: GraphNode): GraphTrail {
    return new TrailImpl(start);
  }
}
