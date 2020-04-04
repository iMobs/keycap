import { Component } from 'react';

import {
  KeyboardCallback,
  registerCallback,
  unregisterCallback,
} from './common';

type KeyCapDecorator = (
  target: Component,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<KeyboardCallback>
) => void;

export function keyCap(keys: string[]): KeyCapDecorator {
  const decorator: KeyCapDecorator = (target, propertyKey, descriptor) => {
    const { componentDidMount, componentWillUnmount } = target;
    const fn = descriptor.value;

    if (!fn) {
      return;
    }

    target.componentDidMount = function (): void {
      registerCallback({ instance: this, callback: fn, keys });
      componentDidMount?.call(this);
    };

    target.componentWillUnmount = function (): void {
      unregisterCallback({ instance: this, callback: fn, keys });
      componentWillUnmount?.call(this);
    };
  };

  return decorator;
}
