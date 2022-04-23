import { num, parse, string } from '../src';
import {
	expectToStrictEqual,
	expectToThrowErrorAndCallConsole
} from './helpers';

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

test('default values', () => {
	const env = parse({
		FOO: string({ default: 'bar' }),
		BAR: num({ default: 1 })
	});

	expectToStrictEqual<typeof env>(env, {
		FOO: 'bar',
		BAR: 1
	});
});
