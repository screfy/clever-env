export class MissingVariableError extends Error {
  constructor(name: string) {
    super(`${name}: missing value`);
  }
}

export class InvalidVariableError extends Error {
  constructor(name: string, reason: string) {
    super(`${name}: ${reason}`);
  }
}
