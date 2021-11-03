import React, { useCallback, useState } from "react";
import {
  Button, Col, Container, Form, Navbar, Row
} from "react-bootstrap";

import {
  GraphCanvas,
  JsonEditor,
  NodesSelection,
  RouteCard,
  Toasts,
  nextIdMessages,
  useToasts,
} from "./components";
import { Edge, Node } from "./components/GraphCanvas/interfaces";
import { JsonFormat } from "./components/JsonEditor";
import { ValidateError } from "./components/JsonEditor/ErrorList";
import GraphFactory, {
  Node as GraphNode,
  Path as GraphPath,
  NodeIdentifier,
  dfs,
} from "./graph";
import { ThemeProvider } from "./Pages";
import Settings from "./Pages/Settings";

import "./App.css";

const json: JsonFormat = {
  nodes: [
    ["01", "1"],
    ["02", "2"],
    ["03", "3"],
    ["04", "4"],
    ["05", "5"],
    ["06", "6"],
    ["07", "7"],
  ],
  paths: [
    ["01", "02", 10],
    ["01", "06", 1],
    ["02", "03", 20],
    ["02", "04", 1],
    ["02", "07", 1],
    ["03", "04", 1],
    ["03", "05", 30],
    ["06", "07", 1],
  ],
};

const jsonNodeToNode = ([id, title]: [string, string]): GraphNode => ({
  id,
  title,
});

const jsonPathToPath = ([start, end, distance]: [
  string,
  string,
  number
]): GraphPath => ({
  start,
  end,
  distance,
});

function App() {
  const [open, setOpen] = useState(true);
  const [errors, setErrors] = useState<ValidateError[]>([]);

  const [messages, setMessages, closeToast] = useToasts();

  const [graph] = useState(GraphFactory.createGraph());

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const [route, setRoute] = useState<string[]>([]);

  const [graphNodes, setGraphNodes] = useState<GraphNode[]>([]);
  const [start, setStart] = useState<NodeIdentifier>();
  const [end, setEnd] = useState<NodeIdentifier>();

  const clearAll = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setGraphNodes([]);
    setErrors([]);
    setStart(undefined);
    setEnd(undefined);
    setRoute([]);
  }, []);

  const toggle = useCallback(() => {
    setOpen((p) => !p);
  }, [setOpen]);

  const success = useCallback(
    (jsonGraph: JsonFormat) => {
      setErrors([]);

      const grNodes: GraphNode[] = jsonGraph.nodes.map(jsonNodeToNode);
      const grPaths: GraphPath[] = jsonGraph.paths.map(jsonPathToPath);
      try {
        const { success: isGraphValid, messages: validateGraphMessages } =
          graph.validate(grNodes, grPaths);

        setMessages(
          validateGraphMessages.map((m, id) => ({
            id,
            title: m.title,
            message: m.message,
            isAlert: true,
          }))
        );

        if (!isGraphValid) return;
        const { nodes: createdNodes, paths: createdPaths } = graph.create(
          grNodes,
          grPaths
        );

        setNodes(
          createdNodes.map((n) => ({
            id: n.id,
            label: n.title,
          }))
        );

        setEdges(
          createdPaths.map((p) => ({
            id: p.id,
            from: p.start.id,
            to: p.end.id,
            distance: p.distance,
          }))
        );

        setGraphNodes(grNodes);
      } catch (err) {
        setMessages((m) => [
          {
            id: nextIdMessages(m),
            title: "Error when try to create graph",
            message: err.message,
            isAlert: true,
          },
          ...m,
        ]);
      }
    },
    [graph, setNodes, setEdges, setMessages, setGraphNodes]
  );

  const failure = useCallback(
    (parseJsonErrors) => {
      graph.create([], []);

      clearAll();
      setErrors(parseJsonErrors);
    },
    [clearAll, graph]
  );

  const findRoute = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!start) return;
      if (!end) return;

      const result = dfs(graph, start, end);

      setMessages((m) => [
        ...m,
        {
          id: nextIdMessages(m),
          title: "dfs-method",
          message: (
            <RouteCard
              start={result.start.title}
              end={result.end.title}
              hasRoute={Boolean(result.path.length)}
              distance={result.distance}
            />
          ),
          closeOnlyHuman: true,
        },
      ]);

      setRoute(result.path.map((p) => p.id));
    },
    [graph, start, end, setMessages]
  );

  return (
    <ThemeProvider>
      <Container fluid>
        <Navbar bg="light" expand={false}>
          <Container fluid>
            <Navbar.Toggle onClick={toggle} />
            <Navbar.Brand href="#">graph</Navbar.Brand>

            <Form onSubmit={findRoute}>
              <Row className="align-items-center">
                <Col xs="auto">
                  <NodesSelection
                    nodes={graphNodes}
                    start={start}
                    selectStart={setStart}
                    end={end}
                    selectEnd={setEnd}
                  />
                </Col>
                <Col xs="auto">
                  <Button size="sm" type="submit">
                    dfs
                  </Button>
                </Col>
              </Row>
            </Form>
            <Settings />
          </Container>
        </Navbar>
        <Row className="app__container">
          {open ? (
            <Col xs={3} className="shadow-lg">
              <JsonEditor
                className="app__drawer"
                value={json as JsonFormat}
                errors={errors}
                preSubmit={clearAll}
                success={success}
                failure={failure}
              />
            </Col>
          ) : null}
          <Col className="app__content">
            <GraphCanvas
              className="app__graph-container"
              edges={edges}
              nodes={nodes}
              route={route}
              start={start}
              end={end}
            />
          </Col>
        </Row>

        <Toasts messages={messages} closeToast={closeToast} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
