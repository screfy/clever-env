import { literal, parse } from '../../src';
import {
	expectToStrictEqual,
	expectToThrowErrorAndCallConsole
} from '../helpers';

test('validate literal', () => {
	const env = parse(
		{
			FOO: literal({
				values: ['foo', 'bar']
			})
		},
		{
			env: { FOO: 'bar' }
		}
	);

	expectToStrictEqual<typeof env>(env, { FOO: 'bar' });
});

test('fail with invalid value', () => {
	expectToThrowErrorAndCallConsole(() =>
		parse(
			{
				FOO: literal({
					values: ['foo', 'bar']
				})
			},
			{
				env: { FOO: 'baz' }
			}
		)
	);
});
