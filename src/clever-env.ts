import { InvalidVariableError, MissingVariableError } from './errors';
import {
	ErrorList,
	Schema,
	Options,
	VariableOptions,
	ValidatorFn,
	Validator
} from './types';
import { displayErrors } from './utils';

function validateVariable<T>(
	key: string,
	value: string | undefined,
	{ options, validate }: Validator<T>
): T {
	if (options.default && !value) {
		return options.default;
	}

	if (!value) {
		throw new MissingVariableError(key);
	}

	const validatedValue = validate(key, value, options);

	return validatedValue;
}

export function createValidator<T, O = VariableOptions<T>>(
	validate: ValidatorFn<T, O>
): (options?: O) => Validator<T, O> {
	return (options = {} as O) => ({ options, validate });
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
