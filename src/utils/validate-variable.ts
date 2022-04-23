import { MissingVariableError } from '../errors';
import { Validator } from '../types';

export function validateVariable<T>(
	key: string,
	value: string | undefined,
	{ options, validator }: Validator<T>
): T {
	let valueForValidation: string | T | undefined;

	// Set a default value for a variable when is provided:
	if (options.default !== undefined && value === undefined) {
		valueForValidation = options.default;
	}

	// Throw an error when the variable does not exist:
	if (value === undefined && valueForValidation === undefined) {
		throw new MissingVariableError(key);
	}

	if (valueForValidation === undefined) {
		valueForValidation = value as string;
	}

	return validator(key, valueForValidation, options);
}
