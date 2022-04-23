import { InvalidVariableError } from '../errors';
import { VariableOptions } from '../types';
import { createValidator } from '../utils/create-validator';

export function json<T = { [key: string]: unknown }>(
	options: VariableOptions<T> = {}
) {
	return createValidator<T>((key, value) => {
		try {
			const parsedValue = JSON.parse(value);

			return parsedValue as T;
		} catch {
			throw new InvalidVariableError(key, `value is not valid JSON`);
		}
	})(options);
}
