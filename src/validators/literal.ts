import { InvalidVariableError } from '../errors';
import { createValidator } from '../tsenv';
import { VariableOptions } from '../types';

export interface LiteralOptions<T> extends VariableOptions<T> {
  values?: T[];
}

export function literal<T extends string>(options: LiteralOptions<T> = {}) {
  return createValidator<T, LiteralOptions<T>>((name, input, { values }) => {
    if (values && !values.includes(input as T)) {
      throw new InvalidVariableError(
        name,
        `value '${input}' is not valid literal (${values.join(', ')})`
      );
    }

    return input as T;
  })(options);
}
