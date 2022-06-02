import cleverEnv from '../src';

describe('Missing variable', () => {
	test('missing variable', () => {
		expect(() =>
			cleverEnv(
				(schema) => ({
					FOO: schema.string()
				}),
				{
					env: {}
				}
			)
		).toThrowError();
	});
});
