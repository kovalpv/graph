const storage = (() => {
  let store: Record<string, string> = {};

  const getItem = jest.fn((key: string): string | null => store[key] || null);
  const removeItem = jest.fn((key: string): void => {
    delete store[key];
  });
  const setItem = jest.fn((key: string, value: string): void => {
    store[key] = value.toString();
  });

  const clear = jest.fn((): void => {
    store = {};

    getItem.mockClear();
    removeItem.mockClear();
    setItem.mockClear();
    clear.mockClear();
  });
  return {
    length: 0,
    clear,
    getItem,
    removeItem,
    setItem,
  };
})();

Object.defineProperty(window, "localStorage", {
  value: storage,
});
