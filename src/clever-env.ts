import { InvalidVariableError, MissingVariableError } from './errors';
import {
	EnvironmentVariables,
	ErrorList,
	Options,
	VariableConfig
} from './types';
import { displayErrors } from './utils/display-errors';
import { ensureValue } from './utils/ensure-value';
import { VariableSchemaBuilder } from './VariableSchemaBuilder';

export function cleverEnv<
	SchemaBuilder extends VariableSchemaBuilder,
	Variables extends Record<string, VariableConfig>
>(
	buildSchema: (schema: SchemaBuilder) => Variables,
	{ env = process.env }: Options = {}
): Readonly<EnvironmentVariables<Variables>> {
	const schemaBuilder = new VariableSchemaBuilder();
	const schema = buildSchema(schemaBuilder as SchemaBuilder);
	const result: Record<string, unknown> = {};
	const errors: ErrorList = [];

	for (const key in schema) {
		try {
			const ensuredValue = ensureValue(key, env[key], {
				default: schema[key].default
			});
			const value = schema[key].resolve(key, ensuredValue);

			result[key] = value;
		} catch (e) {
			if (
				e instanceof MissingVariableError ||
				e instanceof InvalidVariableError
			) {
				errors.push(e);
			} else {
				throw e;
			}
		}
	}

	if (errors.length) {
		displayErrors(errors);
	}

	return result as EnvironmentVariables<Variables>;
}
