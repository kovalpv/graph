import htmlStubElement from "./htmlStubElement";

describe("htmlStubElement", () => {
  test("should add attributes", () => {
    const element = htmlStubElement();
    const htmlElement = element.asHtmlElement();

    htmlElement.setAttribute("id", "1");
    htmlElement.setAttribute("style", "{ color: 'red' }");

    expect(element.getObject()).toEqual({ id: "1", style: "{ color: 'red' }" });
    expect(element.setAttribute).toBeCalledTimes(2);
    expect(element.setAttribute.mock.calls).toEqual([
      ["id", "1"],
      ["style", "{ color: 'red' }"],
    ]);
    expect(element.getObject()).toEqual({
      id: "1",
      style: "{ color: 'red' }",
    });
  });

  test("should return null when attribute is not found", () => {
    const element = htmlStubElement();
    const htmlElement = element.asHtmlElement();

    const value = htmlElement.getAttribute("not found property");

    expect(value).toBeNull();

    expect(element.getAttribute).toBeCalledTimes(1);
    expect(element.getAttribute).toBeCalledWith("not found property");
    expect(element.getObject()).toEqual({});
  });

  test("should return value when attribute added", () => {
    const element = htmlStubElement();
    const htmlElement = element.asHtmlElement();

    htmlElement.setAttribute("href", "www.some-test.ru");
    const value = htmlElement.getAttribute("href");

    expect(value).toEqual("www.some-test.ru");

    expect(element.getAttribute).toBeCalledTimes(1);
    expect(element.getAttribute).toBeCalledWith("href");
    expect(element.getObject()).toEqual({
      href: "www.some-test.ru",
    });
  });
});
