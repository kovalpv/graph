/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
import GraphImpl from "../GraphImpl";
import dfs from "./dfs";

describe("dfs", () => {
  test("should find route", () => {
    const graph = new GraphImpl();
    const {
      paths: [, secondPath, thirdPath],
    } = graph.create(
      [
        { id: "01", title: "1" },
        { id: "02", title: "2" },
        { id: "03", title: "3" },
        { id: "04", title: "4" },
      ],
      [
        { start: "01", end: "02", distance: 1 },
        { start: "01", end: "03", distance: 2 },
        { start: "03", end: "04", distance: 5 },
      ]
    );
    const result = dfs(graph, "01", "04");
    expect(result.start).toEqual(graph.findNode("01"));
    expect(result.end).toEqual(graph.findNode("04"));
    expect(result.path.length).toEqual(2);
    expect(result.path[0]).toEqual(secondPath);
    expect(result.path[1]).toEqual(thirdPath);
    expect(result.distance).toEqual(7);
  });

  test("should find route big graph2", () => {
    const graph = new GraphImpl();

    const {
      paths: [
        path_01_02,
        path_01_06,
        path_02_03,
        path_02_04,
        path_02_07,
        path_03_04,
        path_03_05,
        path_06_07,
      ],
    } = graph.create(
      [
        { id: "01", title: "1" },
        { id: "02", title: "2" },
        { id: "03", title: "3" },
        { id: "04", title: "4" },
        { id: "05", title: "5" },
        { id: "06", title: "6" },
        { id: "07", title: "7" },
      ],
      [
        { start: "01", end: "02", distance: 10 },
        { start: "01", end: "06", distance: 1 },
        { start: "02", end: "03", distance: 20 },
        { start: "02", end: "04", distance: 1 },
        { start: "02", end: "07", distance: 1 },
        { start: "03", end: "04", distance: 1 },
        { start: "03", end: "05", distance: 30 },
        { start: "06", end: "07", distance: 1 },
      ]
    );

    const result = dfs(graph, "01", "05");

    expect(result.path.length).toEqual(3);
    expect(result.distance).toEqual(60);

    expect(result.path[0]).toEqual(path_01_02);
    expect(result.path[1]).toEqual(path_02_03);
    expect(result.path[2]).toEqual(path_03_05);
  });

  test("should find route from 01 to 06", () => {
    const graph = new GraphImpl();

    const {
      paths: [
        path_01_02,
        path_01_06,
        path_02_03,
        path_02_04,
        path_02_07,
        path_03_04,
        path_03_05,
        path_06_07,
      ],
    } = graph.create(
      [
        { id: "01", title: "1" },
        { id: "02", title: "2" },
        { id: "03", title: "3" },
        { id: "04", title: "4" },
        { id: "05", title: "5" },
        { id: "06", title: "6" },
        { id: "07", title: "7" },
      ],
      [
        { start: "01", end: "02", distance: 10 },
        { start: "01", end: "06", distance: 1 },
        { start: "02", end: "03", distance: 20 },
        { start: "02", end: "04", distance: 1 },
        { start: "02", end: "07", distance: 1 },
        { start: "03", end: "04", distance: 1 },
        { start: "03", end: "05", distance: 30 },
        { start: "06", end: "07", distance: 1 },
      ]
    );

    const result = dfs(graph, "01", "06");

    expect(result.path.length).toEqual(1);
    expect(result.distance).toEqual(1);

    expect(result.path[0]).toEqual(path_01_06);
  });

  test("should find route is empty when not found", () => {
    const graph = new GraphImpl();

    const {
      paths: [
        path_01_02,
        path_01_06,
        path_02_03,
        path_02_04,
        path_02_07,
        path_03_04,
        path_03_05,
        path_06_07,
      ],
    } = graph.create(
      [
        { id: "01", title: "1" },
        { id: "02", title: "2" },
        { id: "03", title: "3" },
        { id: "04", title: "4" },
        { id: "05", title: "5" },
        { id: "06", title: "6" },
        { id: "07", title: "7" },
      ],
      [
        { start: "01", end: "02", distance: 10 },
        { start: "01", end: "06", distance: 1 },
        { start: "02", end: "03", distance: 20 },
        { start: "02", end: "04", distance: 1 },
        { start: "02", end: "07", distance: 1 },
        { start: "03", end: "04", distance: 1 },
        { start: "03", end: "05", distance: 30 },
        { start: "06", end: "07", distance: 1 },
      ]
    );

    const result = dfs(graph, "07", "06");

    expect(result.path.length).toEqual(0);
  });

  test("should find route is empty from 02 to 06", () => {
    const graph = new GraphImpl();

    const {
      paths: [
        path_01_02,
        path_01_06,
        path_02_03,
        path_02_04,
        path_02_07,
        path_03_04,
        path_03_05,
        path_06_07,
      ],
    } = graph.create(
      [
        { id: "01", title: "1" },
        { id: "02", title: "2" },
        { id: "03", title: "3" },
        { id: "04", title: "4" },
        { id: "05", title: "5" },
        { id: "06", title: "6" },
        { id: "07", title: "7" },
      ],
      [
        { start: "01", end: "02", distance: 10 },
        { start: "01", end: "06", distance: 1 },
        { start: "02", end: "03", distance: 20 },
        { start: "02", end: "04", distance: 1 },
        { start: "02", end: "07", distance: 1 },
        { start: "03", end: "04", distance: 1 },
        { start: "03", end: "05", distance: 30 },
        { start: "06", end: "07", distance: 1 },
      ]
    );

    const result = dfs(graph, "02", "06");

    expect(result.path.length).toEqual(0);
  });

  test("should find route is empty from 01 to 02", () => {
    const graph = new GraphImpl();

    const {
      paths: [
        path_01_02,
        path_01_06,
        path_02_03,
        path_02_04,
        path_02_07,
        path_03_04,
        path_03_05,
        path_06_07,
      ],
    } = graph.create(
      [
        { id: "01", title: "1" },
        { id: "02", title: "2" },
        { id: "03", title: "3" },
        { id: "04", title: "4" },
        { id: "05", title: "5" },
        { id: "06", title: "6" },
        { id: "07", title: "7" },
      ],
      [
        { start: "01", end: "02", distance: 10 },
        { start: "01", end: "06", distance: 1 },
        { start: "02", end: "03", distance: 20 },
        { start: "02", end: "04", distance: 1 },
        { start: "02", end: "07", distance: 1 },
        { start: "03", end: "04", distance: 1 },
        { start: "03", end: "05", distance: 30 },
        { start: "06", end: "07", distance: 1 },
      ]
    );

    const result = dfs(graph, "01", "02");

    expect(result.path.length).toEqual(1);
    expect(result.distance).toEqual(10);

    expect(result.path[0]).toEqual(path_01_02);
  });
});
