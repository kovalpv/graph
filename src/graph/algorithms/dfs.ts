import { Stack } from "../../collections";
import {
  NodeIdentifier, GraphNode, GraphPath, Graph,
} from "../interfaces";

export interface DFSResult {
  readonly start: GraphNode;
  readonly end: GraphNode;
  readonly path: GraphPath[];
  readonly distance: number;
}

function dfs(
  graph: Graph,
  startId: NodeIdentifier,
  endId: NodeIdentifier
): DFSResult {
  const start = graph.findNode(startId);
  const end = graph.findNode(endId);
  let path: GraphPath[] = [];

  const stackNodes = new Stack<GraphNode>();
  const stackPaths = new Stack<GraphPath>();
  const visitedPath = new Set<GraphPath>();
  const visited = new Set<GraphNode>();

  let current: GraphNode = start;
  stackNodes.push(start);
  while (current !== end && !stackNodes.isEmpty()) {
    current = stackNodes.pop();

    while (!stackPaths.isEmpty() && current !== stackPaths.peek().end) {
      stackPaths.pop();
    }
    current.forEach((innerPath) => {
      if (!visitedPath.has(innerPath) && !visited.has(innerPath.end)) {
        stackNodes.push(innerPath.end);
        stackPaths.push(innerPath);
        visitedPath.add(innerPath);
        visited.add(innerPath.end);
      }
    });
  }

  while (!stackPaths.isEmpty() && stackPaths.peek().end.id !== endId) {
    stackPaths.pop();
  }
  while (!stackPaths.isEmpty()) {
    const a = stackPaths.pop();
    if (a.start.id === current.id) {
      current = a.end;
      // eslint-disable-next-line no-continue
      continue;
    }
    if (!path.length) {
      path = [a];
    }
    if (path[0].start === a.end) {
      path = [a, ...path];
    }
  }

  Object.freeze(path);
  return {
    start,
    end,
    path,
    distance: path.reduce((sum, { distance }) => sum + distance, 0),
  };
}

export default dfs;
