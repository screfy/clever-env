import { InvalidVariableError } from '../errors';
import { createValidator } from '../clever-env';
import { VariableOptions } from '../types';
import { parseNumber } from '../utils';

export interface NumberOptions extends VariableOptions<number> {
	range?: 'tcp' | [number, number];
}

export const number = createValidator<number, NumberOptions>(
	(name, input, { range }) => {
		const value = parseNumber(name, input);

		if (range && range == 'tcp') {
			if (value % 1 !== 0 || value < 1 || value > 65535) {
				throw new InvalidVariableError(
					name,
					`value '${input}' is out of TCP range (1-65535)`
				);
			}
		} else if (range) {
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
