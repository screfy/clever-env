import { InvalidVariableError } from '../errors';
import { createValidator } from '../tsenv';

export const bool = createValidator<boolean>((name, input) => {
	switch (input) {
		case 'true':
		case '1':
			return true;
		case 'false':
		case '0':
			return false;
		default:
			throw new InvalidVariableError(
				name,
				`value '${input}' is not valid boolean`
			);
	}
});
