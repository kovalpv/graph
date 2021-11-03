import jsonFormatter from "./formatter";

describe("jsonFormatter", () => {
  test("should format json", () => {
    const json = {
      nodes: [
        ["01", "1"],
        ["02", "2"],
        ["03", "3"],
      ],
      paths: [
        ["01", "02", 2],
        ["02", "03", 1],
        ["01", "03", 5],
      ],
    };

    const qwe = `{
  "nodes": [
    ["01", "1"],
    ["02", "2"],
    ["03", "3"]
  ],
  "paths": [
    ["01", "02", 2],
    ["02", "03", 1],
    ["01", "03", 5]
  ]
}`;

    expect(jsonFormatter(json)).toEqual(qwe);
  });
});
