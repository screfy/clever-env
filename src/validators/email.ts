import { createValidator } from '../tsenv';
import { InvalidVariableError } from '../errors';

const EMAIL_EXPRESSION =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

export const email = createValidator<string>((name, input) => {
  if (!EMAIL_EXPRESSION.test(input)) {
    throw new InvalidVariableError(
      name,
      `value '${input}' is not valid email address`
    );
  }

  return input;
});
