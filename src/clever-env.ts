import { InvalidVariableError, MissingVariableError } from './errors';
import { ErrorList, Schema, Options, Validator } from './types';
import { displayErrors } from './utils/display-errors';

function validateVariable<T>(
	key: string,
	value: string | undefined,
	{ options, validator }: Validator<T>
): T {
	if (options.default && !value) {
		return options.default;
	}

	if (!value) {
		throw new MissingVariableError(key);
	}

	const validatedValue = validator(key, value, options);

	return validatedValue;
}

export function parse<Variables>(
	schema: Schema<Variables>,
	{ env = process.env }: Options = {}
): Readonly<Variables> {
	const result = {} as Variables;
	const errors: ErrorList = [];

	for (const name in schema) {
		const input = env[name];
		const validator = schema[name];

		try {
			const value = validateVariable(name, input, validator);

			result[name] = value;
		} catch (e) {
			if (
				e instanceof MissingVariableError ||
				e instanceof InvalidVariableError
			) {
				errors.push(e);
			} else {
				throw e;
			}
		}
	}

	if (errors.length) {
		displayErrors(errors);
	}

	return result;
}
