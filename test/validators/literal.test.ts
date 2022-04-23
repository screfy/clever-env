import { literal, cleverEnv } from '../../src';
import {
	expectToStrictEqual,
	expectToThrowErrorAndCallConsole
} from '../__helpers__';

describe('Literal validator', () => {
	test('validate provided value', () => {
		const env = cleverEnv(
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
			cleverEnv(
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

	test('validate default value', () => {
		const env = cleverEnv({
			FOO: literal({
				values: ['foo', 'bar'],
				default: 'bar'
			})
		});

		expectToStrictEqual<typeof env>(env, { FOO: 'bar' });
	});

	test('fail with invalid value', () => {
		expectToThrowErrorAndCallConsole(() =>
			cleverEnv({
				FOO: literal({
					values: ['foo', 'bar'],
					// @ts-ignore: This is ok:
					default: 'baz'
				})
			})
		);
	});
});
