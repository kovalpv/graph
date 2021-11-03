export interface Node {
  readonly id: string;
  readonly label: string;
}
export interface Edge {
  readonly id: string;
  readonly from: string;
  readonly to: string;
  readonly distance: number;
}
