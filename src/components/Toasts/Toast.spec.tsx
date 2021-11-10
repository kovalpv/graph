import React from "react";

import { render } from "@testing-library/react";

import Toast from "./Toast";

describe("Toast", () => {
  test("should render element", () => {
    const { getByText } = render(<Toast title="test toast" message="some message for test" />);

    expect(getByText(/test toast/)).toBeInTheDocument();
    expect(getByText(/some message for test/)).toBeInTheDocument();
  });

  test("should triggered autoclose toast when !closeOnlyHuman and has onClose", () => {
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");

    const onCloseSpy = jest.fn();

    render(<Toast title="test toast" message="some message for test" onClose={onCloseSpy} />);

    expect(onCloseSpy).not.toBeCalled();

    jest.advanceTimersByTime(5000);

    expect(onCloseSpy).toBeCalled();

    jest.clearAllTimers();
    jest.useRealTimers();
  });
});
