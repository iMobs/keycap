export type KeySet = {
  key: string;
  modifiers?: string[];
};

export function parseKeys(keys: string | string[]): KeySet[] {
  if (!Array.isArray(keys)) {
    keys = [keys];
  }

  return keys.map((key) => {
    key = key.toLowerCase().trim();

    const keySet: KeySet = {
      key,
    };

    const matches = key.split(/\s?\+\s?/);

    if (matches.length > 1) {
      keySet.key = matches.pop()!;
      keySet.modifiers = matches.sort();
    }

    return keySet;
  });
}
