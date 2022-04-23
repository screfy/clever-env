import { parse, port } from '../../src';
import {
	expectToStrictEqual,
	expectToThrowErrorAndCallConsole
} from '../helpers';

test('validate port', () => {
	const env = parse(
		{
			FOO: port()
		},
		{
			env: { FOO: '80' }
		}
	);

	expectToStrictEqual<typeof env>(env, { FOO: 80 });
});

test('fail with invalid value', () => {
	expectToThrowErrorAndCallConsole(() =>
		parse(
			{
				FOO: port()
			},
			{
				env: { FOO: 'bar' }
			}
		)
	);
});

test('fail with out of TCP range', () => {
	expectToThrowErrorAndCallConsole(() =>
		parse(
			{
				FOO: port()
			},
			{
				env: { FOO: '70000' }
			}
		)
	);
});
