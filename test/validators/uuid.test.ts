import { parse, uuid } from '../../src';
import {
	expectToStrictEqual,
	expectToThrowErrorAndCallConsole
} from '../helpers';

const EXAMPLE_UUID = '31436aab-8c5b-41b5-b60e-7909960c94b0';

test('validate uuid', () => {
	const env = parse(
		{
			FOO: uuid()
		},
		{
			env: { FOO: EXAMPLE_UUID }
		}
	);

	expectToStrictEqual<typeof env>(env, { FOO: EXAMPLE_UUID });
});

test('fail with invalid uuid', () => {
	expectToThrowErrorAndCallConsole(() =>
		parse(
			{
				FOO: uuid()
			},
			{
				env: { FOO: 'bar' }
			}
		)
	);
});
