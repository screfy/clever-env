import { expectToStrictEqual } from '.';
import cleverEnv, { StringVariableOptions } from '../../src';

export function expectStringToBeValid(
	value: string,
	expectedValue: string,
	options?: StringVariableOptions
) {
	const env = cleverEnv(
		(schema) => ({
			FOO: schema.string(options)
		}),
		options?.default
			? undefined
			: {
					env: { FOO: value }
			  }
	);

	expectToStrictEqual<typeof env>(env, { FOO: expectedValue });
}

export function expectStringToBeInvalid(
	value: string,
	options?: StringVariableOptions
) {
	expect(() =>
		cleverEnv(
			(schema) => ({
				FOO: schema.string(options)
			}),
			options?.default
				? undefined
				: {
						env: { FOO: value }
				  }
		)
	).toThrowError();
}
