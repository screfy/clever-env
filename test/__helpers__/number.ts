import { expectToStrictEqual, expectToThrowErrorAndCallConsole } from '.';
import { NumberOptions, number, cleverEnv } from '../../src';

export function expectNumberToBeValid(
	value: string,
	expectedValue: number,
	options?: NumberOptions
) {
	const env = cleverEnv(
		{
			FOO: number(options)
		},
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
	options?: NumberOptions
) {
	expectToThrowErrorAndCallConsole(() =>
		cleverEnv(
			{
				FOO: number(options)
			},
			options?.default
				? undefined
				: {
						env: { FOO: value }
				  }
		)
	);
}
