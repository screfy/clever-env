import { InvalidVariableError } from '../errors';
import { createValidator } from '../clever-env';
import { VariableOptions } from '../types';
import { parseNumber } from '../utils';

export interface NumberOptions extends VariableOptions<number> {
	range?: [number, number];
}

export const num = createValidator<number, NumberOptions>(
	(name, input, { range }) => {
		const value = parseNumber(name, input);

		if (range) {
			const [min, max] = range;

			if (value < min || value > max) {
				throw new InvalidVariableError(
					name,
					`value '${input}' is out of range (${min}-${max})`
				);
			}
		}

		return value;
	}
);
