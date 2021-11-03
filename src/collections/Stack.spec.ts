import Stack from "./Stack";

describe("Stack", () => {
  test("should first in last out", () => {
    const stack = new Stack();
    stack.push(1);
    stack.push(2);

    expect(stack.pop()).toEqual(2);
    expect(stack.pop()).toEqual(1);
  });

  test("should should peek last", () => {
    const stack = new Stack();
    stack.push(1);
    stack.push(2);

    expect(stack.peek()).toEqual(2);
  });

  test("should is stack empty", () => {
    const stack = new Stack();

    expect(stack.isEmpty()).toBeTruthy();
  });

  test("should is not stack empty", () => {
    const stack = new Stack();

    stack.push(1);

    expect(stack.isEmpty()).toBeFalsy();
  });
});
