import { parse, string, StringOptions } from '../src';

function mockConsole() {
	const consoleMock = jest
		.spyOn(console, 'error')
		.mockImplementationOnce(() => {});

	return consoleMock;
}

export function expectToThrowErrorAndCallConsole(fn: () => unknown) {
	const consoleMock = mockConsole();

	expect(() => fn()).toThrowError();
	expect(consoleMock).toBeCalledTimes(1);

	consoleMock.mockClear();
}

export function expectToStrictEqual<T>(actual: T, expected: T) {
	expect(actual).toStrictEqual<T>(expected);
}

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
