import { InvalidVariableError, MissingVariableError } from './errors';
import { ErrorList, Schema, Options } from './types';
import { displayErrors } from './utils/display-errors';
import { validateVariable } from './utils/validate-variable';

export function cleverEnv<Variables>(
	schema: Schema<Variables>,
	{ env = process.env }: Options = {}
): Readonly<Variables> {
	const result = {} as Variables;
	const errors: ErrorList = [];

	for (const key in schema) {
		const value = env[key];
		const validator = schema[key];

		try {
			result[key] = validateVariable(key, value, validator);
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
