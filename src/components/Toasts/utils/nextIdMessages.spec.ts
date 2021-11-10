import { ToastMessage } from "../interfaces";
import nextIdMessages from "./nextIdMessages";

describe("nextIdMessages", () => {
  test("should return 1 when array is empty", () => {
    const id = nextIdMessages([]);

    expect(id).toEqual(1);
  });

  test("should return 2 when maximum is 1", () => {
    const id = nextIdMessages([
      {
        id: 1,
        title: "title-1",
        message: "message-1",
      },
    ]);

    expect(id).toEqual(2);
  });

  test("should return 100 when maximum is 99", () => {
    const messages: ToastMessage[] = [
      {
        id: 1,
        title: "title-1",
        message: "message-1",
      },
      {
        id: 99,
        title: "title-99",
        message: "message-99",
      },
      {
        id: 3,
        title: "title-3",
        message: "message-3",
      },
    ];
    const id = nextIdMessages(messages);

    expect(id).toEqual(100);
  });
});
