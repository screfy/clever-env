import { InvalidVariableError } from '../errors';
import { VariableOptions } from '../types';
import { createValidator } from '../utils/create-validator';

export function json<T = { [key: string]: unknown }>(
	options: VariableOptions<T> = {}
) {
	return createValidator<T>((key, value) => {
		try {
			if (typeof value !== 'string') {
				return value;
			}

			return JSON.parse(value);
		} catch {
			throw new InvalidVariableError(key, value, 'a JSON');
		}
	})(options);
}
