import { EmptyKeyError, InvalidKeyError } from '../src/errors';
import { parseEvent, parseString } from '../src/keys';

describe(parseEvent, () => {
  it('creates a key from a KeyBoardEvent', () => {
    const event = new KeyboardEvent('keydown', {
      key: 'a',
      ctrlKey: true,
      shiftKey: true,
    });

    const result = parseEvent(event);
    expect(result).toEqual('ctrl+shift+a');
  });
});

describe(parseString, () => {
  it('ignores case', () => {
    expect(parseString('A')).toEqual('a');
  });

  describe('with modifier keys', () => {
    it('handles modifiers', () => {
      expect(parseString('ctrl+a')).toEqual('ctrl+a');
    });

    it('normalizes modifiers', () => {
      expect(parseString('control+a')).toEqual('ctrl+a');
    });

    it('handles multiple modifiers', () => {
      expect(parseString('ctrl+shift+a')).toEqual('ctrl+shift+a');
    });

    it('orders modifiers', () => {
      expect(parseString('shift+command+alt+control+a')).toEqual(
        'alt+ctrl+meta+shift+a'
      );
    });

    describe('when modifier is not valid', () => {
      it('throws an InvalidKeyError', () => {
        expect(() => parseString('foo+a')).toThrow(InvalidKeyError);
      });
    });
  });

  describe('when input is empty', () => {
    it('throws an EmptyKeyError', () => {
      expect(() => parseString('')).toThrow(EmptyKeyError);
    });
  });

  describe('when key is not valid', () => {
    it('throws an InvalidKeyError', () => {
      expect(() => parseString('abc')).toThrow(InvalidKeyError);
    });
  });
});
