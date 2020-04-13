import { renderHook } from '@testing-library/react-hooks';
import { useKeyCap } from '../src';

describe(useKeyCap, () => {
  it('calls a registered callback', () => {
    const callback = jest.fn();
    const keys = ['a'];
    renderHook(() => useKeyCap({ callback, keys }));
    const event = new KeyboardEvent('keydown', {
      key: 'a',
    });
    document.dispatchEvent(event);
    expect(callback).toHaveBeenCalledWith(event);
  });

  it('does not call a registered callback with a different key', () => {
    const callback = jest.fn();
    const keys = ['a'];
    renderHook(() => useKeyCap({ callback, keys }));
    const event = new KeyboardEvent('keydown', {
      key: 'b',
    });
    document.dispatchEvent(event);
    expect(callback).not.toHaveBeenCalled();
  });

  it('does not call an unmounted callback', () => {
    const cb1 = jest.fn();
    const keys = ['a'];
    const { rerender } = renderHook(
      ({ callback }) => useKeyCap({ callback, keys }),
      {
        initialProps: { callback: cb1 },
      }
    );

    // Render with a new callback ref
    rerender({ callback: jest.fn() });

    const event = new KeyboardEvent('keydown', {
      key: 'a',
    });
    document.dispatchEvent(event);
    expect(cb1).not.toHaveBeenCalled();
  });
});
