import { json, cleverEnv } from '../../src';
import {
	expectToStrictEqual,
	expectToThrowErrorAndCallConsole
} from '../__helpers__';

describe('JSON validator', () => {
	test('validate provided value', () => {
		const env = cleverEnv(
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
			cleverEnv(
				{
					FOO: json<{ bar: string }>()
				},
				{
					env: { FOO: 'bar' }
				}
			)
		);
	});

	test('validate default value', () => {
		const env = cleverEnv({
			FOO: json<{ bar: string }>({ default: { bar: 'baz' } })
		});

		expectToStrictEqual<typeof env>(env, { FOO: { bar: 'baz' } });
	});

	test('fail with invalid default value', () => {
		expectToThrowErrorAndCallConsole(() =>
			cleverEnv({
				// @ts-ignore: This is ok:
				FOO: json<{ bar: string }>({ default: 'baz' })
			})
		);
	});
});
