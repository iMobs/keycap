export type KeyboardCallback = (e: KeyboardEvent) => void;

type KeyMap = Map<KeyboardCallback, string[]>;

const keyMap: KeyMap = new Map();

export type Options = {
  callback: KeyboardCallback;
  keys: string[];
};

let registered = false;

function keydownListener(this: Document, e: KeyboardEvent): void {
  keyMap.forEach((keys, callback) => {
    callback.call(this, e);
  });
}

export const registerCallback = ({ callback, keys }: Options): void => {
  keyMap.set(callback, keys);

  if (!registered) {
    document.addEventListener('keydown', keydownListener);
    registered = true;
  }
};

export const unregisterCallback = (callback: KeyboardCallback): void => {
  keyMap.delete(callback);

  if (!keyMap.size) {
    document.removeEventListener('keydown', keydownListener);
    registered = false;
  }
};
