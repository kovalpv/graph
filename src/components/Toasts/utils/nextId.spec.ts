import nextId from "./nextId";

describe("nextId", () => {
  test("should return 1 when array is empty", () => {
    const id = nextId([]);

    expect(id).toEqual(1);
  });

  test("should return 2 when maximum is 1", () => {
    const id = nextId([1]);

    expect(id).toEqual(2);
  });

  test("should return 100 when maximum is 99", () => {
    const id = nextId([1, 99, 3]);

    expect(id).toEqual(100);
  });
});
