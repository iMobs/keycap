export type KeyboardCallback = (e: KeyboardEvent) => void;

export type Options = {
  instance?: object;
  callback: KeyboardCallback;
  keys: string[];
};

type InstanceMap = Map<object | KeyboardCallback, Options>;

const instanceMap: InstanceMap = new Map();

let registered = false;

function keydownListener(e: KeyboardEvent): void {
  instanceMap.forEach(({ instance, callback }) => {
    callback.call(instance, e);
  });
}

export function isEmpty(): boolean {
  return !instanceMap.size;
}

export function registerCallback(options: Options): void {
  const { instance, callback } = options;
  instanceMap.set(instance ?? callback, options);

  if (!registered) {
    document.addEventListener('keydown', keydownListener);
    registered = true;
  }
}

export function unregisterCallback({ instance, callback }: Options): void {
  instanceMap.delete(instance ?? callback);

  if (isEmpty()) {
    document.removeEventListener('keydown', keydownListener);
    registered = false;
  }
}
