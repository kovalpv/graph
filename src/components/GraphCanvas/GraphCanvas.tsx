import React, { useEffect, useRef, useState } from "react";
import { DataSet } from "vis-data";
import { Network } from "vis-network";
import { Edge, Node } from "./interfaces";

interface GraphCanvasProps {
  readonly nodes: Node[];
  readonly edges: Edge[];
  readonly route: string[];
  readonly className?: string;
  readonly start?: string;
  readonly end?: string;
}

const DEFAULT_COLOR = "#0d6efd";
const START_COLOR = "#dc3545";
const END_COLOR = "#198754";
const PATH_COLOR = "#dc3545";

const GraphCanvas: React.FunctionComponent<GraphCanvasProps> = ({
  className,
  nodes,
  edges,
  route,
  start,
  end,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [network, setNetwork] = useState<Network>();

  useEffect(() => {
    if (!ref.current) return;
    const options = {};
    setNetwork(new Network(ref.current, {}, options));
  }, [setNetwork]);

  useEffect(() => {
    const netNodes = new DataSet(nodes);
    const netEdges = new DataSet(
      edges.map(({ distance, ...rest }) => ({
        label: distance.toFixed(2),
        ...rest,
        arrows: "to",
      }))
    );

    network?.setData({
      nodes: netNodes,
      edges: netEdges,
    });
  }, [nodes, edges, network]);

  useEffect(() => {
    edges.forEach((e) => {
      network?.updateEdge(e.id, { color: DEFAULT_COLOR, width: 1 });
    });
    route.forEach((r) => {
      network?.updateEdge(r, { color: PATH_COLOR, width: 2 });
    });
  }, [edges, network, route]);

  useEffect(() => {
    nodes.forEach((n) => {
      let color = DEFAULT_COLOR;
      if (n.id === start) color = START_COLOR;
      if (n.id === end) color = END_COLOR;
      network?.updateClusteredNode(n.id, { color });
    });
  }, [nodes, start, end, network]);

  return <div ref={ref} className={className} />;
};

export default GraphCanvas;
