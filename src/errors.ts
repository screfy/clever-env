export class MissingVariableError extends Error {
  public name: string;

  constructor(name: string) {
    super(`${name}: missing value`);

    this.name = name;
  }
}

export class InvalidVariableError extends Error {
  constructor(name: string, reason: string) {
    super(`${name}: ${reason}`);
  }
}
