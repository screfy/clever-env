import { expectToStrictEqual, expectToThrowErrorAndCallConsole } from '.';
import { StringOptions, string, parse } from '../../src';

export function expectStringToBeValid(
	value: string,
	expectedValue: string,
	options?: StringOptions
) {
	const env = parse(
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
	expectToThrowErrorAndCallConsole(() =>
		parse(
			{
				FOO: string(options)
			},
			options?.default
				? undefined
				: {
						env: { FOO: value }
				  }
		)
	);
}
