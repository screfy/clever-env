import { InvalidVariableError } from '../errors';
import { createValidator } from '../clever-env';

const BOOLEAN_POSITIVES = [true, 'true', 1, '1'];
const BOOLEAN_NEGATIVES = [false, 'false', 0, '0'];

export const boolean = createValidator<boolean>((key, value) => {
	if (BOOLEAN_POSITIVES.includes(value)) {
		return true;
	}

	if (BOOLEAN_NEGATIVES.includes(value)) {
		return false;
	}

	throw new InvalidVariableError(key, `value '${value}' is not valid boolean`);
});
