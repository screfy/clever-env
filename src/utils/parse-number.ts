import { InvalidVariableError } from '../errors';

export function parseNumber(key: string, value: string | number): number {
	if (typeof value === 'number') {
		return value;
	}

	const num = Number(value);

	if (isNaN(num)) {
		throw new InvalidVariableError(key, `value '${value}' is not valid number`);
	}

	return num;
}
