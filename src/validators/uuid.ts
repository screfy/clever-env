import { createValidator } from '../tsenv';
import { InvalidVariableError } from '../errors';

const UUID_EXPRESSION =
	/^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;

export const uuid = createValidator<string>((name, input) => {
	if (!UUID_EXPRESSION.test(input)) {
		throw new InvalidVariableError(name, `value '${input}' is not valid UUID`);
	}

	return input;
});
