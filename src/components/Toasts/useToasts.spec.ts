import { act, renderHook } from "@testing-library/react-hooks";

import useToasts from "./useToasts";

describe("useToasts", () => {
  test("should add one toast", () => {
    const { result } = renderHook(() => useToasts());

    act(() => {
      const setMessage = result.current[1];
      setMessage([
        {
          id: 1,
          title: "title-1",
          message: "message-1",
        },
      ]);
    });

    expect(result.current[0].length).toEqual(1);
  });

  test("should remove element", () => {
    const { result } = renderHook(() => useToasts());

    act(() => {
      const setMessage = result.current[1];
      setMessage([
        {
          id: 1,
          title: "title-1",
          message: "message-1",
        },
        {
          id: 2,
          title: "title-2",
          message: "message-2",
        },
      ]);
    });

    expect(result.current[0].length).toEqual(2);
    expect(result.current[0]).toEqual([
      {
        id: 1,
        title: "title-1",
        message: "message-1",
      },
      {
        id: 2,
        title: "title-2",
        message: "message-2",
      },
    ]);

    act(() => {
      result.current[2](1);
    });

    expect(result.current[0].length).toEqual(1);
    expect(result.current[0]).toEqual([
      {
        id: 2,
        title: "title-2",
        message: "message-2",
      },
    ]);
  });
});
