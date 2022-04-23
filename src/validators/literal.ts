import { InvalidVariableError } from '../errors';
import { VariableOptions } from '../types';
import { createValidator } from '../utils/create-validator';

export interface LiteralOptions<T> extends VariableOptions<T> {
	values?: T[];
}

export function literal<T extends string>(options: LiteralOptions<T> = {}) {
	return createValidator<T, LiteralOptions<T>>((key, value, { values }) => {
		if (values && !values.includes(value as T)) {
			throw new InvalidVariableError(
				key,
				`value '${value}' is not valid literal (${values.join(', ')})`
			);
		}

		return value as T;
	})(options);
}
