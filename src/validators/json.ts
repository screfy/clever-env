import { createValidator } from '../tsenv';
import { InvalidVariableError } from '../errors';
import { VariableOptions } from '../types';

export function json<T = { [key: string]: unknown }>(
  options: VariableOptions<T> = {}
) {
  return createValidator<T>((name, input) => {
    try {
      const value = JSON.parse(input);

      return value as T;
    } catch {
      throw new InvalidVariableError(name, 'invalid json');
    }
  })(options);
}
