# clever-env

[`clever-env`][clever-env] validates and sanitizes environment variables and
parses them to the right type.

## Why validate environment variables?

Environment variables are injected from outside into your application, and you
have no control over them within your codebase.

For example, a section of your code relies on the existence of the `PORT` variable.
There is no guarantee that at the time of running your application, the `PORT`
variable exists and has the correct value, so you must validate it.

## Installation

```bash
npm install clever-env
```

## Usage

```ts
import { cleverEnv, literal, number, string } from 'clever-env';

const env = cleverEnv({
  NODE_ENV: literal({
    values: ['production', 'development', 'test'],
    default: 'development'
  }),
  PORT: number({ range: 'tcp' }),
  URL: string({ format: 'url' }),
  GITHUB_USERNAME: string({
    default: 'screfy'
  })
});
```

It defaults to using `process.env` as a base for parsing environment variables,
but it can be overridden like this:

```ts
import { cleverEnv } from 'clever-env';

const env = cleverEnv(
  {
    ...
  },
  {
    env: { PORT: 80 }
  }
);
```

## Validators

The library comes with the following built-in validators.

### `string`

Ensures the value is a string and is not undefined or empty.

```ts
{
  // Must be a valid email:
  EMAIL: string({ format: 'email' }),
  // Must be a valid URL:
  URL: string({ format: 'url' }),
  // Must be a valid UUID v4:
  UUID: string({ format: 'uuid' }),
  // Must be in the provided format:
  REGEX: string({ format: /[a-z]/ }),
}
```

### `number`

Enforces the value to be a valid string representation of a number.

```ts
{
  // Must be in the TCP range (1-65535):
  TCP: number({ range: 'tcp' }),
  // Must be in the range 1-100:
  RANGE: number({ range: [1, 100] }),
}
```

### `boolean`

Enforces the value to be a valid string representation of a boolean.
The following values are considered as a valid booleans and will be parsed:

- `'true', '1'` are parsed to `true`
- `'false', '0'` are parsed to `false`

```ts
{
  BOOL: boolean(),
}
```

### `literal`

Forces the value to be one of the pre-defined values.

```ts
{
  NODE_ENV: literal({
    values: ['production', 'development', 'test'],
    default: 'development'
  }),
}
```

### `json`

Enforces the value to be a valid string representation of a valid JSON object.

```ts
{
  JSON: json<{ foo: string }>(),
}
```

## Custom validators

For every other validation use case, you can create your custom validator.
You can find an example [here][custom-validator].

[clever-env]: https://npmjs.com/clever-env
[custom-validator]: /test/validators/custom-validator.test.ts
