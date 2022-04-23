import { literal, parse } from '../../src';
import {
	expectToStrictEqual,
	expectToThrowErrorAndCallConsole
} from '../__helpers__';

describe('Literal validator', () => {
	test('validate provided value', () => {
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

	test('validate default value', () => {
		const env = parse({
			FOO: literal({
				values: ['foo', 'bar'],
				default: 'bar'
			})
		});

		expectToStrictEqual<typeof env>(env, { FOO: 'bar' });
	});

	test('fail with invalid value', () => {
		expectToThrowErrorAndCallConsole(() =>
			parse({
				FOO: literal({
					values: ['foo', 'bar'],
					// @ts-ignore: This is ok:
					default: 'baz'
				})
			})
		);
	});
});
