import { renderHook } from '@testing-library/react-hooks';

import { useKeyCap } from '../src/hooks';

describe(useKeyCap, () => {
  it('should register event listener', () => {
    const callback = jest.fn();
    renderHook(() => useKeyCap({ callback, keys: ['a'] }));
    const event = new KeyboardEvent('keydown');
    document.dispatchEvent(event);
    expect(callback).toHaveBeenCalledWith(event);
  });

  it('should unregister the event listener on unmount', () => {
    const cb = jest.fn();
    const { rerender } = renderHook(
      ({ callback }) => useKeyCap({ callback, keys: ['a'] }),
      {
        initialProps: { callback: cb },
      }
    );

    // Render with a new callback ref
    rerender({ callback: jest.fn() });

    const event = new KeyboardEvent('keydown');
    document.dispatchEvent(event);
    expect(cb).not.toHaveBeenCalled();
  });
});
