/// <reference types="react-scripts" />

interface SpyDocumentBuilder {
  readonly getAppendChild: () => jest.SpyInstance;
  readonly mockHeadAppendChild: () => SpyDocumentBuilder;
  readonly getHeadRemoveChild: () => jest.SpyInstance;
  readonly mockHeadRemoveChild: () => SpyDocumentBuilder;
  readonly mockGetElementById: () => SpyDocumentBuilder;
  readonly getGetElementById: () => jest.SpyInstance;
  readonly mockCreateElement: () => SpyDocumentBuilder;
  readonly getCreateElement: () => jest.SpyInstance;
  readonly on: () => void;
  readonly off: () => void;
  readonly clear: () => void;
}

interface HtmlStubElement {
  readonly getObject: () => Record<string, string>;
  readonly setAttribute: jest.SpyInstance;
  readonly getAttribute: (name: string) => string;
  readonly asHtmlElement: () => HTMLElement;
}

declare const spyDocumentBuilder: () => SpyDocumentBuilder;

declare const htmlStubElement: () => HtmlStubElement;
