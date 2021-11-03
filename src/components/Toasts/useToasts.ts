import { useCallback, useState } from "react";

import { ToastMessage } from "./interfaces";

const defaultToasts: ToastMessage[] = [];

export default function useToasts(): [
  ToastMessage[],
  React.Dispatch<React.SetStateAction<ToastMessage[]>>,
  (id: number) => void
  ] {
  const [toasts, setToasts] = useState<ToastMessage[]>(defaultToasts);

  const closeToast = useCallback(
    (id) => setToasts((m) => m.filter(({ id: mId }) => id !== mId)),
    [setToasts]
  );

  return [toasts, setToasts, closeToast];
}
