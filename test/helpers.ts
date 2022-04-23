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
