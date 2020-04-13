import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { keyCap } from '../src';

describe(keyCap, () => {
  type TestProps = {
    onKeyCap: Function;
  };

  class TestClass extends Component<TestProps> {
    @keyCap(['a'])
    testMethod(event: KeyboardEvent): void {
      this.props.onKeyCap(event);
    }

    render(): null {
      return null;
    }
  }

  it('calls a registered callback', () => {
    const callback = jest.fn();
    render(<TestClass onKeyCap={callback} />);
    const event = new KeyboardEvent('keydown', {
      key: 'a',
    });
    document.dispatchEvent(event);
    expect(callback).toHaveBeenCalledWith(event);
  });

  it('does not call a registered callback with a different key', () => {
    const callback = jest.fn();
    render(<TestClass onKeyCap={callback} />);
    const event = new KeyboardEvent('keydown', {
      key: 'b',
    });
    document.dispatchEvent(event);
    expect(callback).not.toHaveBeenCalled();
  });

  it('does not call an unmounted callback', () => {
    const callback = jest.fn();
    const { unmount } = render(<TestClass onKeyCap={callback} />);
    unmount();
    const event = new KeyboardEvent('keydown', {
      key: 'a',
    });
    document.dispatchEvent(event);
    expect(callback).not.toHaveBeenCalled();
  });
});
