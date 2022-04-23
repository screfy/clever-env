import { cleverEnv, string } from '../src';
import { expectToThrowErrorAndCallConsole } from './__helpers__';

describe('Missing variable', () => {
	test('missing variable', () => {
		expectToThrowErrorAndCallConsole(() =>
			cleverEnv(
				{
					FOO: string()
				},
				{
					env: {}
				}
			)
		);
	});
});
