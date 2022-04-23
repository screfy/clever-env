import { createValidator } from '../tsenv';
import { InvalidVariableError } from '../errors';
import { VariableOptions } from '../types';

export interface StringOptions extends VariableOptions<string> {
	regex?: RegExp;
}

export const str = createValidator<string, StringOptions>(
	(name, input, { regex }) => {
		if (regex && !regex.test(input)) {
			throw new InvalidVariableError(
				name,
				`value '${input}' does not match regex`
			);
		}

		return input;
	}
);
