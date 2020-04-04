import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { registerCallback, unregisterCallback } from '../src/common';
import { keyCap } from '../src/decorators';

jest.mock('../src/common');

const registerCallbackMock = registerCallback as jest.Mock<
  typeof registerCallback
>;
const unregisterCallbackMock = unregisterCallback as jest.Mock<
  typeof registerCallback
>;

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

  beforeEach(() => {
    registerCallbackMock.mockClear();
    unregisterCallbackMock.mockClear();
  });

  describe('event listeners', () => {
    it('should register event listener', () => {
      render(<TestClass />);

      expect(registerCallbackMock).toHaveBeenCalledWith({
        instance: expect.any(TestClass),
        callback: TestClass.prototype.testMethod,
        keys: ['a'],
      });

      expect(unregisterCallbackMock).not.toHaveBeenCalled();
    });

    it('should unregister the event listener on unmount', () => {
      const { unmount } = render(<TestClass />);
      unmount();
      expect(unregisterCallbackMock).toHaveBeenCalledWith({
        instance: expect.any(TestClass),
        callback: TestClass.prototype.testMethod,
        keys: ['a'],
      });
    });
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
