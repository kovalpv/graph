import Queue from "./Queue";

describe("Queue", () => {
  test("should add elements and pop", () => {
    const queue = new Queue();
    queue.push(1);
    queue.push(2);

    expect(queue.pop()).toEqual(1);
    expect(queue.pop()).toEqual(2);
  });

  test("should peek first element", () => {
    const queue = new Queue();
    queue.push(1);
    queue.push(2);

    expect(queue.peek()).toEqual(1);
  });

  test("should is queue empty", () => {
    const queue = new Queue();

    expect(queue.isEmpty()).toBeTruthy();
  });

  test("should is not queue empty", () => {
    const queue = new Queue();

    queue.push(1);

    expect(queue.isEmpty()).toBeFalsy();
  });
});
