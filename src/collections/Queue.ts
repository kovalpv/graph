export default class Queue<T> {
  private elements: T[] = [];

  push(element: T) {
    this.elements.push(element);
  }

  pop(): T {
    const element = this.elements.shift();
    if (element === undefined) {
      throw new Error("Queue empty.");
    }
    return element;
  }

  isEmpty(): boolean {
    return this.elements.length === 0;
  }

  peek(): T {
    const element = this.elements.at(0);
    if (element === undefined) {
      throw new Error("Queue empty.");
    }
    return element;
  }
}
