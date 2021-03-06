import { useEffect } from 'react';
import { Options, registerCallback, unregisterCallback } from '@keycap/core';

const useKeyCap = (options: Options): void => {
  useEffect(() => {
    registerCallback(options);

    return (): void => unregisterCallback(options);
  });
};

export { useKeyCap };
