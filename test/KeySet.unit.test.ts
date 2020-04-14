import { EmptyKeyError, InvalidKeyError } from '../src/errors';
import { KeySet } from '../src/KeySet';

describe(KeySet, () => {
  describe('#constructor', () => {
    it('ignores case', () => {
      const result = new KeySet('A');
      expect(result).toHaveProperty('key', 'a');
    });

    describe('with modifier keys', () => {
      it('handles modifiers', () => {
        const result = new KeySet('ctrl+a');
        expect(result).toHaveProperty('key', 'a');
        expect(result).toHaveProperty('modifiers', ['ctrl']);
      });

      it('normalizes modifiers', () => {
        const result = new KeySet('control+a');
        expect(result).toHaveProperty('key', 'a');
        expect(result).toHaveProperty('modifiers', ['ctrl']);
      });

      it('handles multiple modifiers', () => {
        const result = new KeySet('ctrl+shift+a');
        expect(result).toHaveProperty('key', 'a');
        expect(result).toHaveProperty('modifiers', ['ctrl', 'shift']);
      });

      describe('when modifier is not valid', () => {
        it('throws an InvalidKeyError', () => {
          expect(() => new KeySet('foo+a')).toThrow(InvalidKeyError);
        });
      });
    });

    describe('when input is empty', () => {
      it('throws an EmptyKeyError', () => {
        expect(() => new KeySet('')).toThrow(EmptyKeyError);
      });
    });

    describe('when key is not valid', () => {
      it('throws an InvalidKeyError', () => {
        expect(() => new KeySet('abc')).toThrow(InvalidKeyError);
      });
    });
  });

  describe('#matchEvent', () => {
    it('creates a KeySet from a KeyBoardEvent', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'a',
        ctrlKey: true,
        shiftKey: true,
      });

      const result = KeySet.matchEvent(event);
      expect(result).toHaveProperty('key', 'a');
      expect(result).toHaveProperty('modifiers', ['ctrl', 'shift']);
    });
  });

  describe('#toString', () => {
    it('returns a string of the keySet', () => {
      const keySet = new KeySet('control+shift+a');
      expect(keySet.toString()).toEqual('ctrl+shift+a');
    });
  });
});
