import {
	createValidator,
	InvalidVariableError,
	cleverEnv,
	VariableOptions
} from '../../src';
import {
	expectToStrictEqual,
	expectToThrowErrorAndCallConsole
} from '../__helpers__';

interface LengthValidatorOptions extends VariableOptions<string> {
	length?: number;
}

const lengthValidator = createValidator<string, LengthValidatorOptions>(
	(key, value, { length }) => {
		if (length && value.length !== length) {
			throw new InvalidVariableError(
				key,
				`${value.length} characters`,
				`${length} characters long`
			);
		}

		return value;
	}
);

describe('Custom validator', () => {
	test('validate provided value', () => {
		const env = cleverEnv(
			{
				FOO: lengthValidator({ length: 6 })
			},
			{
				env: { FOO: 'foobar' }
			}
		);

		expectToStrictEqual<typeof env>(env, { FOO: 'foobar' });
	});

	test('fail with invalid value', () => {
		expectToThrowErrorAndCallConsole(() => {
			cleverEnv(
				{
					FOO: lengthValidator({ length: 6 })
				},
				{
					env: { FOO: 'bar' }
				}
			);
		});
	});

	test('validate default value', () => {
		const env = cleverEnv({
			FOO: lengthValidator({ length: 6, default: 'foobar' })
		});

		expectToStrictEqual<typeof env>(env, { FOO: 'foobar' });
	});

	test('fail with invalid default value', () => {
		expectToThrowErrorAndCallConsole(() => {
			cleverEnv({
				FOO: lengthValidator({ length: 6, default: 'bar' })
			});
		});
	});
});
