import {
  registerCallback,
  unregisterCallback,
  reset,
  Options,
} from '../src/common';

beforeEach(reset);

describe(registerCallback, () => {
  it('calls a registered callback', () => {
    const callback = jest.fn();
    const keys = ['a'];
    registerCallback({ callback, keys });
    const event = new KeyboardEvent('keydown', {
      key: 'a',
    });
    document.dispatchEvent(event);
    expect(callback).toHaveBeenCalledWith(event);
  });

  it('calls multiple callbacks registered to the same key', () => {
    const cb1 = jest.fn();
    const cb2 = jest.fn();
    const keys = ['a'];
    registerCallback({ callback: cb1, keys });
    registerCallback({ callback: cb2, keys });
    const event = new KeyboardEvent('keydown', {
      key: 'a',
    });
    document.dispatchEvent(event);
    expect(cb1).toHaveBeenCalledWith(event);
    expect(cb2).toHaveBeenCalledWith(event);
  });

  it('does not call a registered callback with a different key', () => {
    const callback = jest.fn();
    const keys = ['a'];
    registerCallback({ callback, keys });
    const event = new KeyboardEvent('keydown', {
      key: 'b',
    });
    document.dispatchEvent(event);
    expect(callback).not.toHaveBeenCalledWith(event);
  });
});

describe(unregisterCallback, () => {
  const sharedTests = (options: Options): void => {
    beforeEach(() => registerCallback(options));

    it('does not call a removed callback', () => {
      unregisterCallback(options);
      const event = new KeyboardEvent('keydown', {
        key: 'a',
      });
      document.dispatchEvent(event);
      expect(options.callback).not.toHaveBeenCalledWith(event);
    });
  };

  describe('with a callback', () =>
    sharedTests({ callback: jest.fn(), keys: ['a'] }));

  describe('with a callback and instance', () =>
    sharedTests({ instance: {}, callback: jest.fn(), keys: ['a'] }));
});
