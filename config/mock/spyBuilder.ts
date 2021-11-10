import { SpyBuilder } from "./interfaces";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function spyBuilder(
  name: string,
  onAction: () => jest.SpyInstance
): SpyBuilder {
  const valueOnce: any[] = [];
  let mocked: jest.SpyInstance;
  return {
    on() {
      mocked = onAction();
      valueOnce.forEach((value) => mocked.mockReturnValueOnce(value));
    },
    off() {
      if (mocked) mocked.mockClear();
    },
    returnValueOnce(value: any) {
      valueOnce.push(value);
    },
    getName() {
      return name;
    },
    getMocked() {
      return mocked;
    },
  };
}
