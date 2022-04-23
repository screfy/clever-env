import { number, parse, string } from '../src';
import { expectToThrowErrorAndCallConsole } from './__helpers__';

describe('Missing variable', () => {
	test('missing variable', () => {
		expectToThrowErrorAndCallConsole(() =>
			parse(
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
