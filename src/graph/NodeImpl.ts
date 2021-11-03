import {
  GraphNode,
  GraphNodeNullable,
  GraphPath,
  GraphTrail,
  PathForeachCallback,
} from "./interfaces";
import TrailImpl from "./TrailImpl";

export default class NodeImpl implements GraphNode {
  private nextNode: GraphNodeNullable;

  private trail: GraphTrail;

  constructor(readonly id: string, readonly title: string) {
    this.nextNode = null;
    this.trail = new TrailImpl(this);
  }

  setNext(node: GraphNodeNullable) {
    this.nextNode = node;
  }

  public get next(): GraphNodeNullable {
    return this.nextNode;
  }

  insertNext(newNode: GraphNode) {
    newNode.setNext(this.nextNode);
    this.nextNode = newNode;
  }

  updateNext(newNode: GraphNode) {
    if (!this.nextNode) {
      this.nextNode = newNode;
    } else {
      const after = this.next?.next ?? null;
      this.nextNode = newNode;
      newNode.setNext(after);
    }
  }

  removeNext() {
    this.nextNode = this.next?.next ?? null;
  }

  addPath(second: GraphNode, distance: number): GraphPath {
    return this.trail.addPath(second, distance);
  }

  removePath(path: GraphPath) {
    this.trail.removePath(path);
  }

  pathCount(): number {
    return this.trail.pathCount();
  }

  forEach(callback: PathForeachCallback) {
    this.trail.forEach(callback);
  }
}
