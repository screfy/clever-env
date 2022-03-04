import { InvalidVariableError } from '../errors';
import { createValidator } from '../tsenv';
import { parseNumber } from '../utils';

export const port = createValidator<number>((name, input) => {
  const value = parseNumber(name, input);

  if (value % 1 !== 0 || value < 1 || value > 65535) {
    throw new InvalidVariableError(
      name,
      `value '${input}' is out of TCP range (1-65535)`
    );
  }

  return value;
});
