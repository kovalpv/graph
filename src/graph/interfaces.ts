export type ForeachCallback = (node: GraphNode, index: number) => void;

export interface Graph {
  readonly addNode: (node: Node) => GraphNode;
  readonly addPath: (
    start: NodeIdentifier,
    end: NodeIdentifier,
    distance: number
  ) => GraphPath;
  readonly forEach: (callback: ForeachCallback) => void;
  readonly nodeCount: () => number;
  readonly reduce: <U>(callbackfn: ReduceCallback<U>, initialValue: U) => U;
  readonly findNode: (id: NodeIdentifier) => GraphNode;
  readonly create: (newNodes: Node[], newPaths: Path[]) => GraphCreate;
  readonly validate: (newNodes: Node[], newPaths: Path[]) => GraphValidate;
}

export interface GraphCreate {
  readonly nodes: GraphNode[];
  readonly paths: GraphPath[];
}

export interface GraphNode {
  readonly id: string;
  readonly title: string;

  readonly next: Nullable<GraphNode>;
  readonly setNext: (node: Nullable<GraphNode>) => void;
  readonly insertNext: (node: GraphNode) => void;

  readonly updateNext: (newNode: GraphNode) => void;
  readonly removeNext: () => void;
  readonly addPath: (second: GraphNode, distance: number) => GraphPath;
  readonly removePath: (path: GraphPath) => void;
  readonly pathCount: () => number;
  readonly forEach: (callback: PathForeachCallback) => void;
}

export type GraphNodeNullable = Nullable<GraphNode>;
export interface GraphPath {
  readonly id: PathIdentifier;
  readonly start: GraphNode;
  readonly end: GraphNode;
  readonly distance: number;
}
export interface GraphTrail {
  readonly addPath: (end: GraphNode, distance: number) => GraphPath;
  readonly removePath: (path: GraphPath) => void;
  readonly pathCount: () => number;
  readonly forEach: (callback: PathForeachCallback) => void;
}
export interface GraphValidate {
  readonly success: boolean;
  readonly messages: GraphValidateMessage[];
}

export interface GraphValidateMessage {
  readonly title: string;
  readonly message: string;
}

export interface Node {
  readonly id: NodeIdentifier;
  readonly title: string;
}
export type NodeIdentifier = string;

export type Nullable<T> = T | null;
export interface Path {
  readonly start: NodeIdentifier;
  readonly end: NodeIdentifier;
  readonly distance: number;
}

export type PathForeachCallback = (path: GraphPath, index: number) => void;
export type PathIdentifier = string;

export type ReduceCallback<U> = (
  previousValue: U,
  currentValue: GraphNode,
  currentIndex: number
) => U;
