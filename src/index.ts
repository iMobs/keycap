export const useKeyCap = (): void => {
  return;
};

const noop = (): void => {
  return;
};

export const withKeyCap = (...keyCodes: string[]): Function => {
  if (!keyCodes.length) {
    return noop;
  }

  return noop;
};
