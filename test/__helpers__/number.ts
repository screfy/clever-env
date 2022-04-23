import { expectToStrictEqual, expectToThrowErrorAndCallConsole } from '.';
import { NumberOptions, number, parse } from '../../src';

export function expectNumberToBeValid(
	value: string,
	expectedValue: number,
	range?: NumberOptions['range']
) {
	const env = parse(
		{
			FOO: number({ range })
		},
		{
			env: { FOO: value }
		}
	);

	expectToStrictEqual<typeof env>(env, { FOO: expectedValue });
}

export function expectNumberToBeInvalid(
	value: string,
	range?: NumberOptions['range']
) {
	expectToThrowErrorAndCallConsole(() =>
		parse(
			{
				FOO: number({ range })
			},
			{
				env: { FOO: value }
			}
		)
	);
}
