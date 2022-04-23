export function expectToStrictEqual<T>(actual: T, expected: T) {
	expect(actual).toStrictEqual<T>(expected);
}
