import {
  registerCallback,
  unregisterCallback,
  isEmpty,
  Options,
} from '../src/common';

describe(registerCallback, () => {
  it('adds a callback to the instance map', () => {
    const options: Options = {
      callback: jest.fn(),
      keys: ['a'],
    };
    expect(isEmpty()).toBeTruthy();
    registerCallback(options);
    expect(isEmpty()).toBeFalsy();
  });
});

describe(unregisterCallback, () => {
  it.only('removes a callback from the instance map', () => {
    const options: Options = {
      callback: jest.fn(),
      keys: ['a'],
    };
    registerCallback(options);
    expect(isEmpty()).toBeFalsy();
    unregisterCallback(options);
    expect(isEmpty()).toBeTruthy();
  });
});
