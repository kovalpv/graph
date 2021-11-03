import { ToastMessage } from "./interfaces";

function nextId(m: number[]): number {
  return Math.max(...m) + 1;
}

export function nextIdMessages(m: ToastMessage[]): number {
  return nextId(m.map(({ id }) => id));
}
