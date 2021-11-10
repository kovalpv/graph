import React from "react";

import { render } from "@testing-library/react";

import { ToastMessage } from "./interfaces";
import Toasts from "./Toasts";

describe("Toasts", () => {
  test("should render empty toats", () => {
    const closeToast = jest.fn();
    const { queryAllByTestId } = render(<Toasts messages={[]} closeToast={closeToast} />);

    const toasts = queryAllByTestId("toasts-item");

    expect(toasts.length).toEqual(0);
  });

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");
  });

  test("should render three toats", () => {
    const closeToast = jest.fn();
    const messages: ToastMessage[] = [
      {
        id: 1,
        title: "title-1",
        message: "message-1"
      },
      {
        id: 2,
        title: "title-2",
        message: "message-2"
      },
      {
        id: 3,
        title: "title-3",
        message: "message-3"
      }
    ];
    const { queryAllByTestId } = render(<Toasts messages={messages} closeToast={closeToast} />);

    const toasts = queryAllByTestId("toasts-item");

    expect(toasts.length).toEqual(3);
  });

  test("should triggered autohide after 5 second", () => {
    const closeToast = jest.fn();
    const messages: ToastMessage[] = [
      {
        id: 1,
        title: "title-1",
        message: "message-1"
      },
      {
        id: 2,
        title: "title-2",
        message: "message-2"
      },
      {
        id: 3,
        title: "title-3",
        message: "message-3"
      }
    ];

    render(<Toasts messages={messages} closeToast={closeToast} />);

    expect(closeToast).not.toBeCalled();

    jest.advanceTimersByTime(5000);

    expect(closeToast).toBeCalled();
    expect(closeToast).toBeCalledTimes(3);
  });
});
