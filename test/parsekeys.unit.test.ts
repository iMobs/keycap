import { EmptyKeyError, InvalidKeyError } from '../src/errors';
import { parseKeys } from '../src/parseKeys';

describe(parseKeys, () => {
  describe('with a single string', () => {
    it('returns an array of KeySet objects', () => {
      expect(parseKeys('a')).toEqual([{ key: 'a' }]);
    });

    it('ignores case', () => {
      expect(parseKeys('A')).toEqual([{ key: 'a' }]);
    });

    describe('with modifier keys', () => {
      it('returns an array of KeySet objects with defined modifiers', () => {
        expect(parseKeys('ctrl+a')).toEqual([
          { key: 'a', modifiers: ['ctrl'] },
        ]);
      });

      it('handles multiple modifiers', () => {
        expect(parseKeys('ctrl+shift+a')).toEqual([
          { key: 'a', modifiers: ['ctrl', 'shift'] },
        ]);
      });
    });

    describe('when input is empty', () => {
      it('throws an EmptyKeyError', () => {
        expect(() => parseKeys('')).toThrow(EmptyKeyError);
      });
    });

    describe('when key is not valid', () => {
      it('throws an InvalidKeyError', () => {
        expect(() => parseKeys('abc')).toThrow(InvalidKeyError);
      });
    });
  });

  describe('with an array of strings', () => {
    it('maps keys to KeySet objects', () => {
      expect(parseKeys(['a', 'ctrl+b'])).toEqual([
        { key: 'a' },
        { key: 'b', modifiers: ['ctrl'] },
      ]);
    });
  });
});
