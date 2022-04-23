import { expectToStrictEqual } from '.';
import { StringOptions, string, cleverEnv } from '../../src';

export function expectStringToBeValid(
	value: string,
	expectedValue: string,
	options?: StringOptions
) {
	const env = cleverEnv(
		{
			FOO: string(options)
		},
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
	options?: StringOptions
) {
	expect(() =>
		cleverEnv(
			{
				FOO: string(options)
			},
			options?.default
				? undefined
				: {
						env: { FOO: value }
				  }
		)
	).toThrowError();
}
