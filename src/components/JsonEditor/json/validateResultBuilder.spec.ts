import validateResultBuilder from "./validateResultBuilder";

describe("validateResultBuilder", () => {
  test("should return success when builder is not add errors", () => {
    const builder = validateResultBuilder();
    expect(builder.build()).toEqual({ success: true });
  });

  test("should return failure when add error", () => {
    const builder = validateResultBuilder();
    builder.addError("has some error");
    expect(builder.build()).toEqual({ success: false, messages: ["has some error"] });
  });
});
