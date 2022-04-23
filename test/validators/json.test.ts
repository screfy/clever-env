import { json, parse } from '../../src';
import {
	expectToStrictEqual,
	expectToThrowErrorAndCallConsole
} from '../helpers';

test('validate json', () => {
	const env = parse(
		{
			FOO: json<{ bar: string }>()
		},
		{
			env: { FOO: JSON.stringify({ bar: 'baz' }) }
		}
	);

	expectToStrictEqual<typeof env>(env, { FOO: { bar: 'baz' } });
});

test('fail with invalid json', () => {
	expectToThrowErrorAndCallConsole(() =>
		parse(
			{
				FOO: json<{ bar: string }>()
			},
			{
				env: { FOO: 'bar' }
			}
		)
	);
});
