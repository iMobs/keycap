import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { keyCap } from '../src/decorators';

describe(keyCap, () => {
  type TestProps = {
    onMount?: Function;
    onUnmount?: Function;
    onKeyCap?: Function;
  };
  class TestClass extends Component<TestProps> {
    componentDidMount(): void {
      this.props.onMount?.();
    }

    componentWillUnmount(): void {
      this.props.onUnmount?.();
    }

    @keyCap(['a'])
    testMethod(event: KeyboardEvent): void {
      this.props.onKeyCap?.(event);
    }

    render(): null {
      return null;
    }
  }

  it('should register event listener', () => {
    const onKeyCap = jest.fn();
    render(<TestClass onKeyCap={onKeyCap} />);
    const event = new KeyboardEvent('keydown');
    document.dispatchEvent(event);
    expect(onKeyCap).toHaveBeenCalledWith(event);
  });

  it('should unregister the event listener on unmount', () => {
    const onKeyCap = jest.fn();
    const { unmount } = render(<TestClass onKeyCap={onKeyCap} />);
    unmount();
    const event = new KeyboardEvent('keydown');
    document.dispatchEvent(event);
    expect(onKeyCap).not.toHaveBeenCalled();
  });

  it('does not override mount/unmount lifecycle methods', () => {
    const onMount = jest.fn();
    const onUnmount = jest.fn();

    expect(onMount).not.toHaveBeenCalled();
    expect(onUnmount).not.toHaveBeenCalled();

    const { unmount } = render(
      <TestClass onMount={onMount} onUnmount={onUnmount} />
    );

    expect(onMount).toHaveBeenCalled();
    expect(onUnmount).not.toHaveBeenCalled();

    unmount();
    expect(onUnmount).toHaveBeenCalled();
  });
});
