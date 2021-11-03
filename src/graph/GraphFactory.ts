import GraphImpl from "./GraphImpl";
import { Graph } from "./interfaces";

export default class GraphFactory {
  static createGraph(): Graph {
    return new GraphImpl();
  }
}
