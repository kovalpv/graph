import React from "react";

import { fireEvent, render, within } from "@testing-library/react";

import { Node } from "../../graph";
import NodesSelection from "./NodesSelection";

describe("NodesSelection", () => {
  test("should rendere two selected nodes", () => {
    const nodes: Node[] = [];
    const { getByText, getAllByTestId } = render(<NodesSelection nodes={nodes} />);

    const options = getAllByTestId("node-select-item");

    expect(options.length).toEqual(2);
    expect(getByText("start")).toBeInTheDocument();
    expect(getByText("finish")).toBeInTheDocument();
  });

  test("should render 8 options when nodes.length equals 3", () => {
    const nodes: Node[] = [
      {
        id: "01",
        title: "1"
      },
      {
        id: "02",
        title: "2"
      }, {
        id: "03",
        title: "3"
      }
    ];
    const { getAllByText, getAllByTestId } = render(<NodesSelection nodes={nodes} />);

    const options = getAllByTestId("node-select-item");

    expect(options.length).toEqual(8);

    expect(getAllByText("1").length).toEqual(2);
    expect(getAllByText("2").length).toEqual(2);
    expect(getAllByText("3").length).toEqual(2);
  });

  test("should selected by input value", () => {
    const nodes: Node[] = [
      {
        id: "01",
        title: "1"
      },
      {
        id: "02",
        title: "2"
      }, {
        id: "03",
        title: "3"
      }
    ];

    const { getAllByTestId } = render(<NodesSelection nodes={nodes} start="01" end="02" />);

    const [start, end] = getAllByTestId("node-select");

    const startItems = within(start).getAllByTestId("node-select-item") as HTMLOptionElement[];
    const endItems = within(end).getAllByTestId("node-select-item") as HTMLOptionElement[];

    expect(startItems[0].selected).toBeFalsy();
    expect(startItems[1].selected).toBeTruthy();
    expect(startItems[2].selected).toBeFalsy();
    expect(startItems[3].selected).toBeFalsy();

    expect(endItems[0].selected).toBeFalsy();
    expect(endItems[1].selected).toBeFalsy();
    expect(endItems[2].selected).toBeTruthy();
    expect(endItems[3].selected).toBeFalsy();
  });

  test("should change selection start: 01 => 03 end: 02 => 01", () => {
    const nodes: Node[] = [
      {
        id: "01",
        title: "1"
      },
      {
        id: "02",
        title: "2"
      }, {
        id: "03",
        title: "3"
      }
    ];

    const { getAllByTestId } = render(<NodesSelection nodes={nodes} start="01" end="02" />);

    const [start, end] = getAllByTestId("node-select");
    const startItems = within(start).getAllByTestId("node-select-item") as HTMLOptionElement[];
    const endItems = within(end).getAllByTestId("node-select-item") as HTMLOptionElement[];

    fireEvent.change(start, { target: { value: "03" } });
    fireEvent.change(end, { target: { value: "01" } });

    expect(startItems[0].selected).toBeFalsy();
    expect(startItems[1].selected).toBeFalsy();
    expect(startItems[2].selected).toBeFalsy();
    expect(startItems[3].selected).toBeTruthy();

    expect(endItems[0].selected).toBeFalsy();
    expect(endItems[1].selected).toBeTruthy();
    expect(endItems[2].selected).toBeFalsy();
    expect(endItems[3].selected).toBeFalsy();
  });

  test("should change selection by methods start: 01 => 03 end: 02 => 01", () => {
    const nodes: Node[] = [
      {
        id: "01",
        title: "1"
      },
      {
        id: "02",
        title: "2"
      }, {
        id: "03",
        title: "3"
      }
    ];

    const { getAllByTestId } = render(<NodesSelection nodes={nodes} start="01" end="02" />);

    const [start, end] = getAllByTestId("node-select");
    const startItems = within(start).getAllByTestId("node-select-item") as HTMLOptionElement[];
    const endItems = within(end).getAllByTestId("node-select-item") as HTMLOptionElement[];

    fireEvent.change(start, { target: { value: "03" } });
    fireEvent.change(end, { target: { value: "01" } });

    expect(startItems[0].selected).toBeFalsy();
    expect(startItems[1].selected).toBeFalsy();
    expect(startItems[2].selected).toBeFalsy();
    expect(startItems[3].selected).toBeTruthy();

    expect(endItems[0].selected).toBeFalsy();
    expect(endItems[1].selected).toBeTruthy();
    expect(endItems[2].selected).toBeFalsy();
    expect(endItems[3].selected).toBeFalsy();
  });
});
