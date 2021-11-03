import { GraphValidate, GraphValidateMessage } from ".";
import Factory from "./Factory";
import {
  Graph,
  Node,
  NodeIdentifier,
  Path,
  GraphNode,
  GraphPath,
  ForeachCallback,
  ReduceCallback,
  GraphCreate,
} from "./interfaces";

const HEAD_IDENTIFIER: NodeIdentifier = "head";
const TAIL_IDENTIFIER: NodeIdentifier = "tail";

export default class GraphImpl implements Graph {
  private headNode: GraphNode;

  private tailNode: GraphNode;

  constructor() {
    this.headNode = Factory.createNode(HEAD_IDENTIFIER, "");
    this.tailNode = Factory.createNode(TAIL_IDENTIFIER, "");
    this.headNode.updateNext(this.tailNode);
  }

  addNode(node: Node): GraphNode {
    const newNode = Factory.createNode(node.id, node.title);
    const nodeAfterInsert = this.findNodeAfterInsert(node.id);
    nodeAfterInsert.insertNext(newNode);
    return newNode;
  }

  addPath(
    start: NodeIdentifier,
    end: NodeIdentifier,
    distance: number
  ): GraphPath {
    const startNode = this.findNode(start);
    const endNode = this.findNode(end);
    return startNode.addPath(endNode, distance);
  }

  forEach(callback: ForeachCallback) {
    let node = this.headNode.next as GraphNode;
    let index = -1;
    while (node !== this.tailNode) {
      callback(node, (index += 1));
      node = node.next as GraphNode;
    }
  }

  nodeCount(): number {
    let node: GraphNode = this.headNode;
    let count = 0;
    while (node !== this.tailNode) {
      node = node.next as GraphNode;
      count += 1;
    }
    return count - 1;
  }

  reduce<U>(callbackfn: ReduceCallback<U>, initialValue: U): U {
    return this.getArray().reduce(
      (prev, current, index) => callbackfn(prev, current, index),
      initialValue
    );
  }

  findNode(id: NodeIdentifier): GraphNode {
    let node = this.headNode;
    while (node !== this.tailNode) {
      if (node.id === id) return node;
      node = node.next as GraphNode;
    }
    throw new Error(`node "${id}" not found`);
  }

  create(newNodes: Node[], newPaths: Path[]): GraphCreate {
    this.headNode.updateNext(this.tailNode);
    const nodes = newNodes.reduce((prev, current) => {
      const node = this.addNode(current);
      return [...prev, node];
    }, [] as GraphNode[]);

    const paths = newPaths.reduce((prev, { start, end, distance }) => {
      const path = this.addPath(start, end, distance);
      return [...prev, path];
    }, [] as GraphPath[]);

    return { nodes, paths };
  }

  // eslint-disable-next-line class-methods-use-this
  validate(nodes: Node[], paths: Path[]): GraphValidate {
    let success = true;
    const messages: GraphValidateMessage[] = [];

    const nodeIds = nodes.map(({ id }) => id);
    for (let index = 0; index < nodeIds.length; index += 1) {
      const id = nodeIds[index];
      const duplicate = nodeIds.reduce((prev, curr, index2) => {
        if (id === curr && index !== index2) return true;
        return prev;
      }, false);
      if (duplicate) {
        messages.push({
          title: "node duplicated",
          message: `node identifier ${JSON.stringify(id)} has duplicate`,
        });
        success = false;
      }
    }

    for (let pathIndex = 0; pathIndex < paths.length; pathIndex += 1) {
      const path = paths[pathIndex];
      if (!nodeIds.includes(path.start)) {
        messages.push({
          title: "node not found",
          message: `start node on path with identifier ${JSON.stringify(
            path.start
          )} not found`,
        });
        success = false;
      }
      if (!nodeIds.includes(path.end)) {
        messages.push({
          title: "node not found",
          message: `end node on path with identifier ${JSON.stringify(
            path.end
          )} not found`,
        });
        success = false;
      }
    }

    return { success, messages };
  }

  private getArray(): GraphNode[] {
    const nodes: GraphNode[] = [];
    this.forEach((node) => {
      nodes.push(node);
    });
    return nodes;
  }

  private findNodeAfterInsert(id: NodeIdentifier): GraphNode {
    return this.reduce((prev, current) => {
      if (current.id.localeCompare(id) === -1) {
        return current;
      }
      return prev;
    }, this.headNode);
  }
}
