/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import "@testing-library/jest-dom";

import { htmlStubElement, spyDocumentBuilder } from "../config/mock";

global.spyDocumentBuilder = spyDocumentBuilder;
global.htmlStubElement = htmlStubElement;
