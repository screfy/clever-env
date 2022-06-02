import cleverEnv from '../../src';
import { expectToStrictEqual } from '../__helpers__';

describe('Boolean validator', () => {
	test('validate provided values', () => {
		const env = cleverEnv(
			(schema) => ({
				TRUE_1: schema.boolean(),
				TRUE_2: schema.boolean(),
				FALSE_1: schema.boolean(),
				FALSE_2: schema.boolean()
			}),
			{
				env: {
					TRUE_1: 'true',
					TRUE_2: '1',
					FALSE_1: 'false',
					FALSE_2: '0'
				}
			}
		);

		expectToStrictEqual<typeof env>(env, {
			TRUE_1: true,
			TRUE_2: true,
			FALSE_1: false,
			FALSE_2: false
		});
	});

	test('fail with invalid value', () => {
		expect(() =>
			cleverEnv(
				(schema) => ({
					FOO: schema.boolean()
				}),
				{
					env: { FOO: 'bar' }
				}
			)
		).toThrowError();
	});

	test('validate default value', () => {
		const env = cleverEnv((schema) => ({
			FOO: schema.boolean({ default: false })
		}));

		expectToStrictEqual<typeof env>(env, {
			FOO: false
		});
	});

	test('fail with invalid default value', () => {
		expect(() =>
			cleverEnv((schema) => ({
				// @ts-ignore: This is ok:
				FOO: schema.boolean({ default: 'foo' })
			}))
		).toThrowError();
	});
});
