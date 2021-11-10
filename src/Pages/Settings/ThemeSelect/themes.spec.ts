import themes from "./themes";

describe("themes", () => {
  test("should have 25 themes", () => {
    expect(themes.length).toEqual(26);
  });
});
