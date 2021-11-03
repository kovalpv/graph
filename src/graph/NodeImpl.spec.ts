import Factory from "./Factory";

describe("NodeImpl test suite", () => {
  test("should add next to second", () => {
    const first = Factory.createNode("01", "First");
    const second = Factory.createNode("02", "Second");
    first.updateNext(second);

    expect(first.next).toEqual(second);
  });

  test("should add replace next second by second_1", () => {
    const first = Factory.createNode("01", "First");
    const second = Factory.createNode("02", "Second");
    const secondNew = Factory.createNode("02_1", "Second");
    const third = Factory.createNode("03", "Second");

    first.updateNext(second);
    second.updateNext(third);

    first.updateNext(secondNew);

    expect(first.next).toEqual(secondNew);
    expect(secondNew.next).toEqual(third);
  });

  test("should remove next node", () => {
    const first = Factory.createNode("01", "First");
    const second = Factory.createNode("02", "Second");
    first.updateNext(second);

    first.removeNext();

    expect(first.next).toBeNull();
  });

  test("should remove next and move after node", () => {
    const first = Factory.createNode("01", "First");
    const second = Factory.createNode("02", "Second");
    const third = Factory.createNode("03", "Second");

    first.updateNext(second);
    second.updateNext(third);

    first.removeNext();

    expect(first.next).toEqual(third);
  });

  test("should add path", () => {
    const first = Factory.createNode("01", "First");
    const second = Factory.createNode("02", "Second");

    const path = first.addPath(second, 10);
    expect(path.start).toEqual(first);
    expect(path.end).toEqual(second);
    expect(path.distance).toEqual(10);
  });

  test("should remove path", () => {
    const first = Factory.createNode("01", "First");
    const second = Factory.createNode("02", "Second");

    const path = first.addPath(second, 10);
    first.removePath(path);
    expect(first.pathCount()).toEqual(0);
  });

  test("should insertNext node", () => {
    const first = Factory.createNode("01", "First");
    const second = Factory.createNode("02", "Second");
    const third = Factory.createNode("03", "Third");

    first.updateNext(third);
    first.insertNext(second);

    expect(first.next).toEqual(second);
    expect(second.next).toEqual(third);
  });
});
