import { InvalidVariableError } from '../errors';
import { VariableOptions } from '../types';
import { createValidator } from '../utils/create-validator';

export interface LiteralOptions<T> extends VariableOptions<T> {
	values?: T[];
}

export function literal<T extends string>(options: LiteralOptions<T> = {}) {
	return createValidator<T, LiteralOptions<T>>((name, input, { values }) => {
		if (values && !values.includes(input as T)) {
			throw new InvalidVariableError(
				name,
				`value '${input}' is not valid literal (${values.join(', ')})`
			);
		}

		return input as T;
	})(options);
}
