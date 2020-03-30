export class KeyCapError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'KeyCapError';
    Object.setPrototypeOf(this, KeyCapError.prototype);
  }
}

export class EmptyKeyError extends KeyCapError {
  constructor() {
    super('Key must be defined');
    this.name = 'EmptyKeyError';
    Object.setPrototypeOf(this, EmptyKeyError.prototype);
  }
}

export class InvalidKeyError extends KeyCapError {
  constructor(key: string) {
    super(`"${key}" is  not a valid key`);
    this.name = 'InvalidModifierError';
    Object.setPrototypeOf(this, InvalidKeyError.prototype);
  }
}
