import { ErrorList } from '../types';
import { InvalidVariableError, MissingVariableError } from '../errors';

export function displayErrors(errors: ErrorList) {
	const missing: string[] = [];
	const invalid: string[] = [];
	const output = [];

	errors.forEach((e) => {
		if (e instanceof MissingVariableError) {
			missing.push(e.key);
		}

		if (e instanceof InvalidVariableError) {
			invalid.push(`    ${e.message}`);
		}
	});

	if (missing.length) {
		output.push(`\n  Missing environment variables: ${missing.join(', ')}`);
	}

	if (invalid.length) {
		invalid.unshift('\n  Invalid environment variables:');

		output.push(...invalid);
	}

	throw new Error(`${output.join('\n')}\n`);
}
