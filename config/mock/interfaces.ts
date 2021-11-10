/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HtmlStubElement {
  readonly getObject: () => Record<string, string>;
  readonly setAttribute: (name: string, value: string) => void;
  readonly getAttribute: (name: string) => string;
  readonly asHtmlElement: () => HTMLElement;
}

export interface MockHtmlStubElement {
  readonly getObject: () => Record<string, string>;
  readonly setAttribute: jest.MockInstance<void, [string, string]>;
  readonly getAttribute: jest.MockInstance<string, [string]>;
  readonly asHtmlElement: () => HTMLElement;
}

export interface SpyBuilder {
  readonly getName: () => string;
  readonly on: () => void;
  readonly off: () => void;
  readonly returnValueOnce: (value: any) => void;
  readonly getMocked: () => jest.SpyInstance;
}

export interface SpyDocumentBuilder {
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
