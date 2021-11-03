import Factory from "./Factory";
import {
  GraphNode,
  GraphPath,
  GraphTrail,
  PathForeachCallback,
} from "./interfaces";

export default class TrailImpl implements GraphTrail {
  private trail: GraphPath[];

  constructor(readonly start: GraphNode) {
    this.trail = [];
  }

  addPath(end: GraphNode, distance: number): GraphPath {
    const path = Factory.createPath(this.start, end, distance);
    let indexInsert = 0;
    for (let index = this.trail.length - 1; index >= 0; index -= 1) {
      const element = this.trail[index];
      if (element.id.localeCompare(path.id) === -1) {
        indexInsert = index + 1;
      }
    }
    this.trail = [
      ...this.trail.slice(0, indexInsert),
      path,
      ...this.trail.slice(indexInsert),
    ];
    return path;
  }

  removePath(path: GraphPath) {
    this.trail = this.trail.filter((x) => x !== path);
  }

  pathCount(): number {
    return this.trail.length;
  }

  forEach(callback: PathForeachCallback) {
    this.trail.forEach(callback);
  }
}
