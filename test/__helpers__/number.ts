import { expectToStrictEqual } from '.';
import cleverEnv, { NumberVariableOptions } from '../../src';

export function expectNumberToBeValid(
	value: string,
	expectedValue: number,
	options?: NumberVariableOptions
) {
	const env = cleverEnv(
		(schema) => ({
			FOO: schema.number(options)
		}),
		options?.default
			? undefined
			: {
					env: { FOO: value }
			  }
	);

	expectToStrictEqual<typeof env>(env, { FOO: expectedValue });
}

export function expectNumberToBeInvalid(
	value: string,
	options?: NumberVariableOptions
) {
	expect(() =>
		cleverEnv(
			(schema) => ({
				FOO: schema.number(options)
			}),
			options?.default
				? undefined
				: {
						env: { FOO: value }
				  }
		)
	).toThrowError();
}
