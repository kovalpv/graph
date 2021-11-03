import { Graph } from "./interfaces";
import GraphImpl from "./GraphImpl";

export default class GraphFactory {
  static createGraph(): Graph {
    return new GraphImpl();
  }
}
