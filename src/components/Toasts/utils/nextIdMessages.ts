import { ToastMessage } from "../interfaces";
import nextId from "./nextId";

export default function nextIdMessages(m: ToastMessage[]): number {
  return nextId(m.map(({ id }) => id));
}
