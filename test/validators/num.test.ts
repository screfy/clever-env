import { num, parse } from '../../src';
import {
	expectToStrictEqual,
	expectToThrowErrorAndCallConsole
} from '../helpers';

test('validate number', () => {
	const env = parse(
		{
			FOO: num()
		},
		{
			env: { FOO: '1' }
		}
	);

	expectToStrictEqual<typeof env>(env, { FOO: 1 });
});

test('fail with invalid value', () => {
	expectToThrowErrorAndCallConsole(() =>
		parse(
			{
				FOO: num()
			},
			{
				env: { FOO: 'bar' }
			}
		)
	);
});

test('fail with out of range', () => {
	expectToThrowErrorAndCallConsole(() =>
		parse(
			{
				FOO: num({ range: [1, 3] })
			},
			{
				env: { FOO: '5' }
			}
		)
	);
});
