import { MissingVariableError } from '../errors';

export function ensureValue(
	key: string,
	value: string | undefined,
	options: { default: unknown }
) {
	let valueForValidation: unknown | undefined;

	// Set a default value for a variable when is provided:
	if (options.default !== undefined && value === undefined) {
		valueForValidation = options.default;
	}

	// Throw an error when the variable does not exist:
	if (value === undefined && valueForValidation === undefined) {
		throw new MissingVariableError(key);
	}

	if (valueForValidation === undefined) {
		valueForValidation = value;
	}

	return valueForValidation as string;
}
