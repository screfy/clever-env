import { createValidator } from '../tsenv';
import { InvalidVariableError } from '../errors';

export const url = createValidator<string>((name, input) => {
  try {
    new URL(input);

    return input;
  } catch {
    throw new InvalidVariableError(name, 'invalid url');
  }
});
