import { withKeyCap } from '../src';

describe(withKeyCap, () => {
  it('returns a function', () => {
    const returnValue = withKeyCap();

    expect(returnValue).toBeInstanceOf(Function);
  });
});
