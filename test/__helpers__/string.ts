import { expectToStrictEqual, expectToThrowErrorAndCallConsole } from '.';
import { StringOptions, string, parse } from '../../src';

export function expectStringToBeValid(
	value: string,
	format?: StringOptions['format']
) {
	const env = parse(
		{
			FOO: string({ format })
		},
		{
			env: { FOO: value }
		}
	);

	expectToStrictEqual<typeof env>(env, { FOO: value });
}

export function expectStringToBeInvalid(
	value: string,
	format?: StringOptions['format']
) {
	expectToThrowErrorAndCallConsole(() =>
		parse(
			{
				FOO: string({ format })
			},
			{
				env: { FOO: value }
			}
		)
	);
}
