import { useEffect } from 'react';
import {
  KeyboardCallback,
  registerCallback,
  unregisterCallback,
} from './common';

export const useKeyCap = (callback: KeyboardCallback): void => {
  useEffect(() => {
    registerCallback();

    return (): void => unregisterCallback();
  });
};
