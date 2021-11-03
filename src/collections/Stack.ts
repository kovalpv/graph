export default class Stack<T> {
  private elements: T[] = [];

  push(element: T) {
    this.elements.push(element);
  }

  pop(): T {
    const element = this.elements.pop();
    if (element === undefined) {
      throw new Error("Stack empty.");
    }
    return element;
  }

  isEmpty() {
    return this.elements.length === 0;
  }

  peek(): T {
    const element = this.elements.at(-1);
    if (element === undefined) {
      throw new Error("Stack empty.");
    }
    return element;
  }
}
