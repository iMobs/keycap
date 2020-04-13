import { renderHook } from '@testing-library/react-hooks';
import { registerCallback, unregisterCallback } from '../src/common';
import { useKeyCap } from '../src/hooks';

jest.mock('../src/common');

const registerCallbackMock = registerCallback as jest.Mock<
  typeof registerCallback
>;
const unregisterCallbackMock = unregisterCallback as jest.Mock<
  typeof registerCallback
>;

describe(useKeyCap, () => {
  beforeEach(() => {
    registerCallbackMock.mockClear();
    unregisterCallbackMock.mockClear();
  });

  it('should register event listener', () => {
    const callback = jest.fn();
    const keys = ['a'];
    renderHook(() => useKeyCap({ callback, keys }));
    expect(registerCallbackMock).toHaveBeenCalledWith({
      instance: undefined,
      callback,
      keys,
    });
  });

  it('should unregister the event listener on unmount', () => {
    const cb1 = jest.fn();
    const keys = ['a'];
    const { rerender } = renderHook(
      ({ callback }) => useKeyCap({ callback, keys }),
      {
        initialProps: { callback: cb1 },
      }
    );

    expect(registerCallbackMock).toHaveBeenCalledWith({
      instance: undefined,
      callback: cb1,
      keys,
    });

    expect(unregisterCallbackMock).not.toHaveBeenCalled();

    // Render with a new callback ref
    const cb2 = jest.fn();
    rerender({ callback: cb2 });

    expect(unregisterCallbackMock).toHaveBeenCalledWith({
      instance: undefined,
      callback: cb1,
      keys,
    });

    expect(registerCallbackMock).toHaveBeenCalledWith({
      instance: undefined,
      callback: cb2,
      keys,
    });
  });
});
