import React from "react";

import { fireEvent, render } from "@testing-library/react";

import NodeSelection from "./NodeSelection";

describe("NodeSelection", () => {
  test("should render empty NodeSelection", () => {
    const { getAllByTestId } = render(<NodeSelection
      title="test component"
      nodes={[]}
    />);
    const renderItems = getAllByTestId("node-select-item");
    expect(renderItems.length).toEqual(1);
  });

  test("should selected default by default", () => {
    const { getAllByTestId } = render(<NodeSelection
      title="select node"
      nodes={[
        {
          id: "01",
          title: "1"
        },
        {
          id: "02",
          title: "2"
        },
        {
          id: "03",
          title: "3"
        }
      ]}
    />);
    const renderItems = getAllByTestId("node-select-item") as HTMLOptionElement[];
    expect(renderItems.length).toEqual(4);

    expect(renderItems[0].selected).toBeTruthy();
    expect(renderItems[1].selected).toBeFalsy();
    expect(renderItems[2].selected).toBeFalsy();
    expect(renderItems[3].selected).toBeFalsy();
  });

  test('should render text ["select node", "1", "2", "3"]', () => {
    const { getAllByTestId } = render(<NodeSelection
      title="select node"
      nodes={[
        {
          id: "01",
          title: "1"
        },
        {
          id: "02",
          title: "2"
        },
        {
          id: "03",
          title: "3"
        }
      ]}
    />);
    const renderItems = getAllByTestId("node-select-item") as HTMLOptionElement[];
    expect(renderItems.length).toEqual(4);
    expect(renderItems.map(({ text }) => text)).toEqual(["select node", "1", "2", "3"]);
  });

  test("should selected by id '02'", () => {
    const { getAllByTestId } = render(<NodeSelection
      title="select node"
      selection="02"
      nodes={[
        {
          id: "01",
          title: "1"
        },
        {
          id: "02",
          title: "2"
        },
        {
          id: "03",
          title: "3"
        }
      ]}
    />);
    const renderItems = getAllByTestId("node-select-item") as HTMLOptionElement[];

    expect(renderItems.length).toEqual(4);
    expect(renderItems[0].selected).toBeFalsy();
    expect(renderItems[1].selected).toBeFalsy();
    expect(renderItems[2].selected).toBeTruthy();
    expect(renderItems[3].selected).toBeFalsy();
  });

  test("should selected change selection from '02' to '03'", () => {
    const { getByTestId, getAllByTestId } = render(<NodeSelection
      title="select node"
      selection="02"
      nodes={[
        {
          id: "01",
          title: "1"
        },
        {
          id: "02",
          title: "2"
        },
        {
          id: "03",
          title: "3"
        }
      ]}
    />);
    const renderItems = getAllByTestId("node-select-item") as HTMLOptionElement[];

    fireEvent.change(getByTestId("node-select"), { target: { value: "03" } });

    expect(renderItems.length).toEqual(4);
    expect(renderItems[0].selected).toBeFalsy();
    expect(renderItems[1].selected).toBeFalsy();
    expect(renderItems[2].selected).toBeFalsy();
    expect(renderItems[3].selected).toBeTruthy();
  });
});
