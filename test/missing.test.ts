import { cleverEnv, string } from '../src';

describe('Missing variable', () => {
	test('missing variable', () => {
		expect(() =>
			cleverEnv(
				{
					FOO: string()
				},
				{
					env: {}
				}
			)
		).toThrowError();
	});
});
