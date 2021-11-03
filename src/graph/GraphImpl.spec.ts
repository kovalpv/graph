import GraphImpl from "./GraphImpl";

describe("Graph", () => {
  test("should add nodes", () => {
    const graph = new GraphImpl();

    graph.addNode({ id: "01", title: "first" });
    graph.addNode({ id: "02", title: "second" });

    expect(graph.nodeCount()).toEqual(2);
  });

  test("should add path", () => {
    const graph = new GraphImpl();

    graph.addNode({ id: "01", title: "first" });
    graph.addNode({ id: "02", title: "second" });

    const path = graph.addPath("01", "02", 10);
    expect(path.distance).toBe(10);
  });

  test("should throw error", () => {
    const graph = new GraphImpl();

    graph.addNode({ id: "01", title: "first" });
    graph.addNode({ id: "02", title: "second" });

    expect(() => {
      graph.addPath("01", "03", 10);
    }).toThrowError(new Error("node \"03\" not found"));
  });

  test("should order by identifier", () => {
    const graph = new GraphImpl();

    const first = graph.addNode({ id: "01", title: "first" });
    const second = graph.addNode({ id: "02", title: "second" });

    expect(graph.nodeCount()).toEqual(2);
    graph.forEach((node, index) => {
      if (index === 0) expect(node).toEqual(first);
      if (index === 1) expect(node).toEqual(second);
    });
  });

  test("should order by identifier multiply", () => {
    const graph = new GraphImpl();

    const first = graph.addNode({ id: "01", title: "first" });
    const third = graph.addNode({ id: "03", title: "third" });
    const second = graph.addNode({ id: "02", title: "second" });

    graph.forEach((node, index) => {
      if (index === 0) expect(node).toEqual(first);
      if (index === 1) expect(node).toEqual(second);
      if (index === 2) expect(node).toEqual(third);
    });
  });

  describe("validation", () => {
    test("should return failure when has two equals node identifiers", () => {
      const graph = new GraphImpl();

      const result = graph.validate(
        [
          { id: "01", title: "1" },
          { id: "01", title: "2" },
        ],
        []
      );

      expect(result.success).toBeFalsy();
      expect(result.messages[0]).toEqual({
        title: "node duplicated",
        message: "node identifier \"01\" has duplicate",
      });
    });

    test("should return failure when path start is not found", () => {
      const graph = new GraphImpl();

      const result = graph.validate(
        [
          { id: "01", title: "1" },
          { id: "02", title: "2" },
        ],
        [{ start: "03", end: "02", distance: 1 }]
      );

      expect(result.success).toBeFalsy();
      expect(result.messages[0]).toEqual({
        title: "node not found",
        message: "start node on path with identifier \"03\" not found",
      });
    });

    test("should return failure when path end is not found", () => {
      const graph = new GraphImpl();

      const result = graph.validate(
        [
          { id: "01", title: "1" },
          { id: "02", title: "2" },
        ],
        [{ start: "02", end: "04", distance: 1 }]
      );

      expect(result.success).toBeFalsy();
      expect(result.messages[0]).toEqual({
        title: "node not found",
        message: "end node on path with identifier \"04\" not found",
      });
    });
  });
});
