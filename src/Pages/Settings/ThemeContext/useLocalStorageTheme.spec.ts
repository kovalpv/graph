/* eslint-disable max-len */
import { act, renderHook } from "@testing-library/react-hooks";

import useThemeState from "./useLocalStorageTheme";

describe("useThemeState", () => {
  const spy = spyDocumentBuilder();

  beforeEach(() => {
    window.localStorage.clear();
    jest.restoreAllMocks();
    spy.clear();
  });

  test('should return "default/bootstrap.min.css" when localStorage.getItem is empty', () => {
    const { result } = renderHook(() => {
      spy.mockGetElementById().mockCreateElement().on();

      spy.getGetElementById().mockReturnValueOnce(null);
      (localStorage.getItem as unknown as jest.SpyInstance).mockReturnValueOnce(
        null
      );
      return useThemeState();
    });

    expect(result.current[0]).toEqual("default/bootstrap.min.css");

    expect(window.localStorage.getItem).toBeCalledTimes(1);
    expect(document.getElementById).toBeCalledWith("app-style-theme");
    expect(spy.getCreateElement()).not.toBeCalled();
  });

  test("should call setAttribute with 'themes/newTheme/bootstrap.min.css' and localStorage has 'theme' key and styleSheetTheme on the page", () => {
    const styleSheetTheme = htmlStubElement();

    const { result } = renderHook(() => {
      spy.mockGetElementById().mockHeadRemoveChild().on();

      spy.getGetElementById().mockReturnValueOnce(styleSheetTheme.asHtmlElement());
      (localStorage.getItem as unknown as jest.SpyInstance).mockReturnValueOnce(
        "newTheme/bootstrap.min.css"
      );
      return useThemeState();
    });
    expect(result.current[0]).toEqual("newTheme/bootstrap.min.css");

    expect(window.localStorage.getItem).toBeCalledTimes(1);
    expect(spy.getGetElementById()).toBeCalledWith("app-style-theme");
    expect(styleSheetTheme.getObject()).toEqual({
      href: "themes/newTheme/bootstrap.min.css",
    });
  });

  test("should create styleSheetTheme and localStorage has 'theme' key and styleSheetTheme not found", () => {
    const styleSheetTheme = htmlStubElement();

    const { result } = renderHook(() => {
      spy.mockGetElementById().mockCreateElement().mockHeadAppendChild().on();

      spy.getGetElementById().mockReturnValueOnce(null);
      spy
        .getCreateElement()
        .mockReturnValue(styleSheetTheme.asHtmlElement());
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      spy.getAppendChild().mockImplementation(() => {});
      (localStorage.getItem as unknown as jest.SpyInstance).mockReturnValueOnce(
        "newTheme/bootstrap.min.css"
      );
      return useThemeState();
    });

    expect(result.current[0]).toEqual("newTheme/bootstrap.min.css");

    expect(window.localStorage.getItem).toBeCalledTimes(1);

    expect(spy.getGetElementById()).toBeCalledTimes(1);
    expect(spy.getGetElementById()).toBeCalledWith("app-style-theme");

    expect(spy.getAppendChild()).toBeCalledTimes(1);
    expect(spy.getAppendChild()).toBeCalledWith(styleSheetTheme);

    expect(styleSheetTheme.getObject()).toEqual({
      id: "app-style-theme",
      rel: "stylesheet",
      type: "text/css",
      href: "themes/newTheme/bootstrap.min.css",
    });
  });
  test("should remove styleSheetTheme when theme change to default and element styleSheetName has on the page", () => {
    const styleSheetTheme = htmlStubElement();

    const { result } = renderHook(() => {
      spy.clear();
      spy.mockGetElementById().mockHeadRemoveChild().on();

      spy.getGetElementById().mockReturnValueOnce(styleSheetTheme);

      (localStorage.getItem as unknown as jest.SpyInstance).mockReturnValueOnce(
        "newTheme/bootstrap.min.css"
      );
      return useThemeState();
    });

    act(() => {
      (result.current[1] as (theme: string) => void)(
        "default/bootstrap.min.css"
      );
    });

    expect(result.current[0]).toEqual("default/bootstrap.min.css");
    expect(spy.getHeadRemoveChild()).toBeCalledTimes(1);
    expect(spy.getHeadRemoveChild()).toBeCalledWith(styleSheetTheme);
  });
  // TODO: ADD test("should create new styleSheetName when styleSheetTheme not found on the page", () => {});
  // TODO: ADD test("should change call to chenge attribute href when getAttribute('href') !== file", () => {});
});
