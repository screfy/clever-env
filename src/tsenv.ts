import { MissingVariableError } from './errors';
import {
  Schema,
  Options,
  VariableOptions,
  ValidatorFn,
  Validator
} from './types';

function validateVariable<T>(
  name: string,
  input: string | undefined,
  { options, validate }: Validator<T>
): T {
  if (options.default && !input) {
    return options.default;
  }

  if (!input) {
    throw new MissingVariableError(name);
  }

  const value = validate(name, input, options);

  return value;
}

export function createValidator<T, O = VariableOptions<T>>(
  validate: ValidatorFn<T, O>
): (options?: O) => Validator<T, O> {
  return (options = {} as O) => ({ options, validate });
}

export function parse<Variables>(
  schema: Schema<Variables>,
  { env = process.env }: Options = {}
): Readonly<Variables> {
  const result = {} as Variables;

  for (const name in schema) {
    const input = env[name];
    const validator = schema[name];

    const value = validateVariable(name, input, validator);

    result[name] = value;
  }

  return result;
}
