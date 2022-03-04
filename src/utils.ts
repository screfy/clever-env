import { ErrorList } from '.';
import { InvalidVariableError, MissingVariableError } from './errors';

export function parseNumber(name: string, input: string): number {
  const value = Number(input);

  if (isNaN(value)) {
    throw new InvalidVariableError(
      name,
      `value '${input}' is not valid number`
    );
  }

  return value;
}

export function displayErrors(errors: ErrorList) {
  const missing: string[] = [];
  const invalid: string[] = [];
  const output = [];

  errors.forEach((e) => {
    if (e instanceof MissingVariableError) {
      missing.push(e.name);
    }

    if (e instanceof InvalidVariableError) {
      invalid.push(`    ${e.message}`);
    }
  });

  if (missing.length) {
    output.push(`\n  Missing environment variables: ${missing.join(', ')}`);
  }

  if (invalid.length) {
    invalid.unshift('\n  Invalid environment variables:');

    output.push(...invalid);
  }

  console.error(`${output.join('\n')}\n`);

  throw new Error(
    `Found ${errors.length} error${
      errors.length > 1 ? 's' : ''
    } in your environment schema.`
  );
}
