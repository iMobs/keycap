import { useEffect } from 'react';
import {
  KeyboardCallback,
  registerCallback,
  unregisterCallback,
} from './common';

export function useKeyCap(callback: KeyboardCallback): void {
  useEffect(() => {
    registerCallback();

    return (): void => unregisterCallback();
  });
}
