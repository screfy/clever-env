import cleverEnv from '../../src';
import { expectToStrictEqual } from '../__helpers__';

describe('Literal validator', () => {
	test('validate provided value', () => {
		const env = cleverEnv(
			(schema) => ({
				FOO: schema.enum({
					values: ['foo', 'bar'] as const
				})
			}),
			{
				env: { FOO: 'bar' }
			}
		);

		expectToStrictEqual<typeof env>(env, { FOO: 'bar' });
	});

	test('fail with invalid value', () => {
		expect(() =>
			cleverEnv(
				(schema) => ({
					FOO: schema.enum({
						values: ['foo', 'bar'] as const
					})
				}),
				{
					env: { FOO: 'baz' }
				}
			)
		).toThrowError();
	});

	test('validate default value', () => {
		const env = cleverEnv((schema) => ({
			FOO: schema.enum({
				values: ['foo', 'bar'] as const,
				default: 'bar'
			})
		}));

		expectToStrictEqual<typeof env>(env, { FOO: 'bar' });
	});

	test('fail with invalid value', () => {
		expect(() =>
			cleverEnv((schema) => ({
				FOO: schema.enum({
					values: ['foo', 'bar'] as const,
					// @ts-ignore: This is ok:
					default: 'baz'
				})
			}))
		).toThrowError();
	});
});
