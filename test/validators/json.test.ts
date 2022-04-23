import { json, parse } from '../../src';
import {
	expectToStrictEqual,
	expectToThrowErrorAndCallConsole
} from '../__helpers__';

describe('JSON validator', () => {
	test('validate provided value', () => {
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

	test('fail with invalid value', () => {
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
});
