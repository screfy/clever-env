import { email, parse } from '../../src';
import {
	expectToStrictEqual,
	expectToThrowErrorAndCallConsole
} from '../helpers';

const EXAMPLE_EMAIL = 'admin@domain.com';

test('validate email', () => {
	const env = parse(
		{
			FOO: email()
		},
		{
			env: { FOO: EXAMPLE_EMAIL }
		}
	);

	expectToStrictEqual<typeof env>(env, { FOO: EXAMPLE_EMAIL });
});

test('fail with invalid email', () => {
	expectToThrowErrorAndCallConsole(() =>
		parse(
			{
				FOO: email()
			},
			{
				env: { FOO: 'bar' }
			}
		)
	);
});
