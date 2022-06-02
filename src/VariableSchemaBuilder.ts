import { InvalidVariableError } from './errors';
import {
	BaseVariableOptions,
	EnumVariableOptions,
	NumberVariableOptions,
	StringVariableOptions,
	VariableConfig
} from './types';
import { parseNumber } from './utils/parse-number';

const BOOLEAN_POSITIVES = [true, 'true', 1, '1'];
const BOOLEAN_NEGATIVES = [false, 'false', 0, '0'];
const EMAIL_EXPRESSION =
	/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const UUID_EXPRESSION =
	/^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;

const FORMATS: {
	[format in Exclude<StringVariableOptions['format'], RegExp | undefined>]: (
		key: string,
		value: string
	) => void;
} = {
	email: (key, value) => {
		if (!EMAIL_EXPRESSION.test(value)) {
			throw new InvalidVariableError(key, value, 'a email');
		}
	},
	url: (key, value) => {
		try {
			new URL(value);
		} catch {
			throw new InvalidVariableError(key, value, 'an URL');
		}
	},
	uuid: (key, value) => {
		if (!UUID_EXPRESSION.test(value)) {
			throw new InvalidVariableError(key, value, 'an UUID');
		}
	}
};

export class VariableSchemaBuilder {
	string(options: StringVariableOptions = {}): VariableConfig<'String'> {
		return {
			type: 'String',
			default: options.default,
			resolve: (key, value) => {
				if (options.format instanceof RegExp) {
					if (!options.format.test(value)) {
						throw new InvalidVariableError(
							key,
							value,
							`in the following format '${options.format.source}'`
						);
					}
				} else if (options.format) {
					FORMATS[options.format](key, value);
				}

				return value;
			}
		};
	}

	number(options: NumberVariableOptions = {}): VariableConfig<'Number'> {
		return {
			type: 'Number',
			default: options.default,
			resolve: (key, value) => {
				const parsedNumber = parseNumber(key, value);

				if (options.range && options.range == 'tcp') {
					if (
						parsedNumber % 1 !== 0 ||
						parsedNumber < 1 ||
						parsedNumber > 65535
					) {
						throw new InvalidVariableError(
							key,
							value,
							`in the TCP range (1-65535)`
						);
					}
				} else if (options.range) {
					const [min, max] = options.range;

					if (parsedNumber < min || parsedNumber > max) {
						throw new InvalidVariableError(
							key,
							value,
							`in the range (${min}-${max})`
						);
					}
				}

				return parsedNumber;
			}
		};
	}

	boolean(
		options: BaseVariableOptions<'Boolean'> = {}
	): VariableConfig<'Boolean'> {
		return {
			type: 'Boolean',
			default: options.default,
			resolve: (key, value) => {
				if (BOOLEAN_POSITIVES.includes(value)) {
					return true;
				}

				if (BOOLEAN_NEGATIVES.includes(value)) {
					return false;
				}

				throw new InvalidVariableError(key, value, 'a boolean');
			}
		};
	}

	enum<Values extends readonly string[]>(
		options: EnumVariableOptions<Values>
	): VariableConfig<'Enum', Values> {
		return {
			type: 'Enum',
			default: options.default,
			resolve: (key, value) => {
				if (options.values && !options.values.includes(value)) {
					throw new InvalidVariableError(
						key,
						value,
						`one of ${options.values.join(', ')}`
					);
				}

				return value;
			}
		};
	}
}
