import { Component } from 'react';

import {
  KeyboardCallback,
  registerCallback,
  unregisterCallback,
} from '@keycap/core';

type KeyCapDecorator = (
  target: Component,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<KeyboardCallback>
) => void;

export function keyCap(keys: string[]): KeyCapDecorator {
  const decorator: KeyCapDecorator = (target, _propertyKey, descriptor) => {
    const { componentDidMount, componentWillUnmount } = target;
    const { value: callback } = descriptor;

    /* istanbul ignore next */
    if (!callback) {
      // This should never happen, TypedPropertyDescriptor should be a union
      return;
    }

    target.componentDidMount = function (): void {
      registerCallback({ instance: this, callback, keys });
      componentDidMount?.call(this);
    };

    target.componentWillUnmount = function (): void {
      unregisterCallback({ instance: this, callback, keys });
      componentWillUnmount?.call(this);
    };
  };

  return decorator;
}
