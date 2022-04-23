import { InvalidVariableError } from '../errors';
import { VariableOptions } from '../types';
import { parseNumber } from '../utils/parse-number';
import { createValidator } from '../utils/create-validator';

export interface NumberOptions extends VariableOptions<number> {
	range?: 'tcp' | [number, number];
}

export const number = createValidator<number, NumberOptions>(
	(key, value, { range }) => {
		const parsedNumber = parseNumber(key, value);

		if (range && range == 'tcp') {
			if (parsedNumber % 1 !== 0 || parsedNumber < 1 || parsedNumber > 65535) {
				throw new InvalidVariableError(
					key,
					`value '${value}' is out of TCP range (1-65535)`
				);
			}
		} else if (range) {
			const [min, max] = range;

			if (parsedNumber < min || parsedNumber > max) {
				throw new InvalidVariableError(
					key,
					`value '${value}' is out of range (${min}-${max})`
				);
			}
		}

		return parsedNumber;
	}
);
