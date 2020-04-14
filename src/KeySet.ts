import { EmptyKeyError, InvalidKeyError } from './errors';

enum ModKey {
  ctrl = 'ctrl',
  shift = 'shift',
  meta = 'meta',
  alt = 'alt',
}

const eventModKeyMap: { [key: string]: ModKey } = {
  ctrlKey: ModKey.ctrl,
  shiftKey: ModKey.shift,
  metaKey: ModKey.meta,
  altKey: ModKey.alt,
};

const userModKeyMap: { [key: string]: ModKey } = {
  control: ModKey.ctrl,
  ctrl: ModKey.ctrl,
  shift: ModKey.shift,
  meta: ModKey.meta,
  cmd: ModKey.meta,
  command: ModKey.meta,
  option: ModKey.alt,
  alt: ModKey.alt,
};

export class KeySet {
  private key!: string;
  private modifiers!: ModKey[];

  public static fromEvent(event: KeyboardEvent): KeySet {
    const { key } = event;

    const modifiers: ModKey[] = [];

    for (const [k, m] of Object.entries(eventModKeyMap)) {
      if (event[k as keyof KeyboardEvent]) {
        modifiers.push(m);
      }
    }

    return new KeySet({
      key,
      modifiers,
    });
  }

  constructor(
    keyStringOrConfig: string | { key: string; modifiers: ModKey[] }
  ) {
    if (typeof keyStringOrConfig === 'string') {
      this.fromString(keyStringOrConfig);
    } else {
      Object.assign(this, keyStringOrConfig);
    }
  }

  public toString(): string {
    return (this.modifiers as string[]).concat(this.key).join('+');
  }

  private fromString(keyString: string): void {
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

    this.key = key;
    this.modifiers = matches
      .map((m) => {
        if (!(m in userModKeyMap)) {
          throw new InvalidKeyError(keyString);
        }

        return userModKeyMap[m];
      })
      .sort();
  }
}
