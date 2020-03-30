import { EmptyKeyError, InvalidKeyError } from './errors';

export type KeySet = {
  key: string;
  modifiers?: string[];
};

export function parseKeys(keys: string | string[]): KeySet[] {
  if (!Array.isArray(keys)) {
    keys = [keys];
  }

  return keys.map((keyString) => {
    const matches = keyString
      .toLowerCase()
      .trim()
      .split(/\s?\+\s?/);

    const key = matches.pop();

    if (!key) {
      throw new EmptyKeyError();
    } else if (!key.match(/^[a-z0-9]$/)) {
      throw new InvalidKeyError(keyString);
    }

    const keySet: KeySet = { key };

    if (matches.length) {
      keySet.modifiers = matches.sort();
    }

    return keySet;
  });
}
