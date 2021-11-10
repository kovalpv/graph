import spyDocumentBuilder from "./spyDocumentBuilder";

describe("spyDocumentBuilder", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  test("should mock getElementId", () => {
    const spy = spyDocumentBuilder();

    spy.mockGetElementById().on();

    spy.getGetElementById().mockReturnValueOnce("element");
    const returnValue = document.getElementById("404");

    expect(spy.getGetElementById()).toHaveBeenCalledTimes(1);
    expect(spy.getGetElementById()).toHaveBeenCalledWith("404");
    expect(returnValue).toEqual("element");
  });

  test("should mock document.head.appendChild", () => {
    const spy = jest.spyOn(document.head, "appendChild");

    const div = document.createElement("div");
    document.head.appendChild(div);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(div);
  });

  test("should mock from builder document.head.appendChild", () => {
    const spy = spyDocumentBuilder();

    spy.mockHeadAppendChild().on();

    const div = document.createElement("div");
    document.head.appendChild(div);

    expect(spy.getAppendChild()).toBeCalledTimes(1);
    expect(spy.getAppendChild()).toBeCalledWith(div);
  });

  test("should mock from builder document.head.removeChild", () => {
    const spy = spyDocumentBuilder();

    spy.mockHeadRemoveChild().on();

    const div = document.createElement("div");
    document.head.removeChild(div);

    expect(spy.getHeadRemoveChild()).toBeCalledTimes(1);
    expect(spy.getHeadRemoveChild()).toBeCalledWith(div);
  });

  test("should mock from builder document.createElement", () => {
    const divElement = document.createElement("div");
    const spy = spyDocumentBuilder();

    spy.mockCreateElement().on();

    spy.getCreateElement().mockReturnValueOnce(divElement);
    const div = document.createElement("div");

    expect(spy.getCreateElement()).toBeCalledTimes(1);
    expect(spy.getCreateElement()).toBeCalledWith("div");
    expect(div).toEqual(divElement);
  });

  test("should spy for all methods", () => {
    const divElement = document.createElement("div");
    const spy = spyDocumentBuilder();

    spy
      .mockHeadAppendChild()
      .mockHeadRemoveChild()
      .mockGetElementById()
      .mockCreateElement()
      .on();
    spy.getCreateElement().mockReturnValueOnce(divElement);

    const div = document.createElement("div");
    spy.getGetElementById().mockReturnValueOnce(div);
    document.head.appendChild(div);
    document.head.removeChild(div);
    const foundElement = document.getElementById("404");

    expect(spy.getAppendChild()).toBeCalledTimes(1);
    expect(spy.getAppendChild()).toBeCalledWith(div);

    expect(spy.getHeadRemoveChild()).toBeCalledTimes(1);
    expect(spy.getHeadRemoveChild()).toBeCalledWith(div);

    expect(spy.getGetElementById()).toBeCalledTimes(1);
    expect(spy.getGetElementById()).toBeCalledWith("404");
    expect(foundElement).toEqual(div);

    expect(spy.getCreateElement()).toBeCalledTimes(1);
    expect(spy.getCreateElement()).toBeCalledWith("div");
    expect(div).toEqual(divElement);
  });
});
