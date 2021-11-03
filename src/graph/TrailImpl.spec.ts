import Factory from "./Factory";

describe("TrailImpl", () => {
  test("should add path one path", () => {
    const start = Factory.createNode("1", "1");
    const second = Factory.createNode("2", "2");
    const trail = Factory.createTrail(start);

    const path = trail.addPath(second, 10);

    expect(trail.pathCount()).toEqual(1);
    expect(path.start).toEqual(start);
    expect(path.end).toEqual(second);
    expect(path.distance).toEqual(10);
  });

  test("should add two paths", () => {
    const start = Factory.createNode("1", "1");
    const second = Factory.createNode("2", "2");
    const third = Factory.createNode("3", "3");
    const trail = Factory.createTrail(start);

    const pathSecond = trail.addPath(second, 21);
    const pathThird = trail.addPath(third, 15);

    expect(trail.pathCount()).toEqual(2);

    expect(pathSecond.start).toEqual(start);
    expect(pathSecond.end).toEqual(second);
    expect(pathSecond.distance).toEqual(21);

    expect(pathThird.start).toEqual(start);
    expect(pathThird.end).toEqual(third);
    expect(pathThird.distance).toEqual(15);
  });

  test("should remove path", () => {
    const start = Factory.createNode("1", "1");
    const second = Factory.createNode("2", "2");
    const third = Factory.createNode("3", "3");
    const trail = Factory.createTrail(start);

    const pathSecond = trail.addPath(second, 21);
    trail.addPath(third, 15);

    expect(trail.pathCount()).toEqual(2);

    trail.removePath(pathSecond);
    expect(trail.pathCount()).toEqual(1);
  });

  test("should forEach paths", () => {
    const start = Factory.createNode("1", "1");
    const second = Factory.createNode("2", "2");
    const third = Factory.createNode("3", "3");
    const trail = Factory.createTrail(start);

    const secondPath = trail.addPath(second, 21);
    const thirdPath = trail.addPath(third, 15);
    trail.forEach((path, index) => {
      if (index === 0) expect(path).toEqual(secondPath);
      if (index === 1) expect(path).toEqual(thirdPath);
    });
  });

  test("should forEach paths order by id", () => {
    const start = Factory.createNode("01", "1");
    const second = Factory.createNode("02", "2");
    const third = Factory.createNode("03", "3");
    const fourth = Factory.createNode("04", "3");
    const trail = Factory.createTrail(start);

    const fourthPath = trail.addPath(fourth, 33);
    const secondPath = trail.addPath(second, 21);

    const thirdPath = trail.addPath(third, 15);

    trail.forEach((path, index) => {
      if (index === 0) expect(path).toEqual(secondPath);
      if (index === 1) expect(path).toEqual(thirdPath);
      if (index === 2) expect(path).toEqual(fourthPath);
    });
  });
});
