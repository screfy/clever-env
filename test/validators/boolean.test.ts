import { boolean, cleverEnv } from '../../src';
import {
	expectToStrictEqual,
	expectToThrowErrorAndCallConsole
} from '../__helpers__';

describe('Boolean validator', () => {
	test('validate provided values', () => {
		const env = cleverEnv(
			{
				TRUE_1: boolean(),
				TRUE_2: boolean(),
				FALSE_1: boolean(),
				FALSE_2: boolean()
			},
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
		expectToThrowErrorAndCallConsole(() =>
			cleverEnv(
				{
					FOO: boolean()
				},
				{
					env: { FOO: 'bar' }
				}
			)
		);
	});

	test('validate default value', () => {
		const env = cleverEnv({
			FOO: boolean({ default: false })
		});

		expectToStrictEqual<typeof env>(env, {
			FOO: false
		});
	});

	test('fail with invalid default value', () => {
		expectToThrowErrorAndCallConsole(() =>
			cleverEnv({
				// @ts-ignore: This is ok:
				FOO: boolean({ default: 'foo' })
			})
		);
	});
});
