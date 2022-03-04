import { InvalidVariableError } from './errors';

export function parseNumber(name: string, input: string): number {
  const value = Number(input);

  if (isNaN(value)) {
    throw new InvalidVariableError(name, 'invalid number');
  }

  return value;
}
