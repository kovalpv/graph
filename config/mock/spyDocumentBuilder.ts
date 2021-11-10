/* eslint-disable arrow-body-style */
import { SpyBuilder, SpyDocumentBuilder } from "./interfaces";
import spyBuilder from "./spyBuilder";

export default function spyDocumentBuilder(): SpyDocumentBuilder {
  let mapBuilders = new Map<string, SpyBuilder>();
  let arrayBuilders: SpyBuilder[] = [];

  const HEAD_APPEND_CHILD_BUILDER_NAME = "document.head.appendChild";
  const HEAD_REMOVE_CHILD_BUILDER_NAME = "document.head.removeChild";
  const DOCUMENT_GET_ELEMENT_BY_ID = "document.getElementById";
  const DOCUMENT_CREATE_ELEMENT = "document.createElement";

  const getMockedElement = (elementId: string) => {
    if (!mapBuilders.has(elementId)) {
      throw new Error(`"${elementId}" is not configured`);
    }
    return mapBuilders.get(elementId).getMocked();
  };

  const appendBuilder = (
    elementId: string,
    onAction: () => jest.SpyInstance
  ) => {
    if (mapBuilders.has(elementId)) {
      throw new Error(`"${elementId}" is already added`);
    }

    const builder = spyBuilder(elementId, onAction);

    mapBuilders.set(elementId, builder);
    arrayBuilders.push(builder);
  };

  return {
    getAppendChild(): jest.SpyInstance {
      return getMockedElement(HEAD_APPEND_CHILD_BUILDER_NAME);
    },

    mockHeadAppendChild(): SpyDocumentBuilder {
      appendBuilder(HEAD_APPEND_CHILD_BUILDER_NAME, () => jest.spyOn(document.head, "appendChild"));
      return this;
    },

    getHeadRemoveChild(): jest.SpyInstance {
      return getMockedElement(HEAD_REMOVE_CHILD_BUILDER_NAME);
    },

    mockHeadRemoveChild(): SpyDocumentBuilder {
      appendBuilder(HEAD_REMOVE_CHILD_BUILDER_NAME, () => {
        return jest.spyOn(document.head, "removeChild").mockImplementation();
      });

      return this;
    },

    mockGetElementById(): SpyDocumentBuilder {
      appendBuilder(DOCUMENT_GET_ELEMENT_BY_ID, () => {
        return jest.spyOn(document, "getElementById");
      });
      return this;
    },

    getGetElementById(): jest.SpyInstance {
      return getMockedElement(DOCUMENT_GET_ELEMENT_BY_ID);
    },

    mockCreateElement(): SpyDocumentBuilder {
      appendBuilder(DOCUMENT_CREATE_ELEMENT, () => {
        return jest
          .spyOn(document, "createElement")
          .mockImplementation();
      });
      return this;
    },

    getCreateElement(): jest.SpyInstance {
      return getMockedElement(DOCUMENT_CREATE_ELEMENT);
    },

    on() {
      arrayBuilders.forEach((b) => {
        b.on();
      });
      return this;
    },

    off() {
      arrayBuilders.forEach((b) => {
        b.off();
      });
      return this;
    },
    clear() {
      this.off();
      mapBuilders = new Map<string, SpyBuilder>();
      arrayBuilders = [];
    },
  };
}
