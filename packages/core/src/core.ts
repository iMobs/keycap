import { parseEvent, parseString } from './keys';

export type KeyboardCallback = (e: KeyboardEvent) => void;

type CallbackOptions = {
  instance?: object;
  callback: KeyboardCallback;
};

export type Options = CallbackOptions & {
  keys: string | string[];
};

type InstanceMap = Map<object | KeyboardCallback, Options>;

const instanceMap: InstanceMap = new Map();

let registered = false;

type CallbackMap = Map<string, Map<object | KeyboardCallback, CallbackOptions>>;

const callbackMap: CallbackMap = new Map();

function keydownListener(event: KeyboardEvent): void {
  const key = parseEvent(event);
  const callbacks = callbackMap.get(key);

  callbacks?.forEach(({ instance, callback }) => {
    callback.call(instance, event);
  });
}

export function reset(): void {
  instanceMap.clear();
  registered = false;
  document.removeEventListener('keydown', keydownListener);
}

export function registerCallback({ instance, callback, keys }: Options): void {
  if (!Array.isArray(keys)) {
    keys = keys.split(',');
  }

  keys.forEach((keyString) => {
    const key = parseString(keyString);
    let callbacks = callbackMap.get(key);

    if (!callbacks) {
      callbackMap.set(key, (callbacks = new Map()));
    }

    callbacks.set(instance ?? callback, { instance, callback });
  });

  if (!registered) {
    document.addEventListener('keydown', keydownListener);
    registered = true;
  }
}

export function unregisterCallback({
  instance,
  callback,
  keys,
}: Options): void {
  if (!Array.isArray(keys)) {
    keys = keys.split(',');
  }

  keys.forEach((keyString) => {
    const key = parseString(keyString);
    const callbacks = callbackMap.get(key);

    if (!callbacks) {
      return;
    }

    callbacks.delete(instance ?? callback);

    if (!callbacks.size) {
      callbackMap.delete(key);
    }
  });

  if (!callbackMap.size) {
    document.removeEventListener('keydown', keydownListener);
    registered = false;
  }
}
