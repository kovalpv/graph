import Factory from "./Factory";

describe("PathImpl", () => {
  test("should create Path", () => {
    const start = Factory.createNode("1", "First");
    const end = Factory.createNode("2", "Second");

    const path = Factory.createPath(start, end, 101);

    expect(path.id).toEqual("1-2-101.00");
    expect(path.start).toEqual(start);
    expect(path.end).toEqual(end);
    expect(path.distance).toEqual(101);
  });
});
