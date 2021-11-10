import { MockHtmlStubElement } from "./interfaces";

export default function htmlStubElement(): MockHtmlStubElement {
  const properties: Record<string, string> = {};

  const setAttribute = jest.fn((name: string, value: string) => {
    properties[name] = value;
  });
  const getAttribute = jest.fn((name: string): string | null => properties[name] ?? null);
  return {
    setAttribute,
    getAttribute,
    getObject(): Record<string, string> {
      return properties;
    },
    asHtmlElement(): HTMLElement {
      return this as unknown as HTMLElement;
    },
  };
}
