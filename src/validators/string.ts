import { InvalidVariableError } from '../errors';
import { createValidator } from '../clever-env';
import { VariableOptions } from '../types';

export interface StringOptions extends VariableOptions<string> {
	format?: 'email' | 'url' | 'uuid' | RegExp;
}

const EMAIL_EXPRESSION =
	/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const UUID_EXPRESSION =
	/^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;

const FORMATS: {
	[format in Exclude<StringOptions['format'], RegExp | undefined>]: (
		key: string,
		value: string
	) => void;
} = {
	email: (key, value) => {
		if (!EMAIL_EXPRESSION.test(value)) {
			throw new InvalidVariableError(
				key,
				`value '${value}' is not valid email address`
			);
		}
	},
	url: (key, value) => {
		try {
			new URL(value);
		} catch {
			throw new InvalidVariableError(key, `value '${value}' is not valid URL`);
		}
	},
	uuid: (key, value) => {
		if (!UUID_EXPRESSION.test(value)) {
			throw new InvalidVariableError(key, `value '${value}' is not valid UUID`);
		}
	}
};

export const string = createValidator<string, StringOptions>(
	(key, value, { format }) => {
		if (format instanceof RegExp) {
			if (!format.test(value)) {
				throw new InvalidVariableError(
					key,
					`value '${value}' does not match regex`
				);
			}
		} else if (format) {
			FORMATS[format](key, value);
		}

		return value;
	}
);
