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
import cleverEnv from 'clever-env';

const env = cleverEnv((schema) => ({
  NODE_ENV: schema.enum({
    values: ['production', 'development', 'test'] as const,
    default: 'development'
  }),
  PORT: schema.number({ range: 'tcp' }),
  URL: schema.string({ format: 'url' }),
  GITHUB_USERNAME: schema.string({
    default: 'screfy'
  })
}));
```

It defaults to using `process.env` as a base for parsing environment variables,
but it can be overridden like this:

```ts
import { cleverEnv } from 'clever-env';

const env = cleverEnv((schema) => ({
    ...
  }),
  {
    env: { PORT: 80 }
  }
);
```

## Validators

The library comes with the following built-in validators.

### `schema.string`

Ensures the value is a string and is not undefined or empty.

```ts
{
  // Must be a valid email:
  EMAIL: schema.string({ format: 'email' }),
  // Must be a valid URL:
  URL: schema.string({ format: 'url' }),
  // Must be a valid UUID v4:
  UUID: schema.string({ format: 'uuid' }),
  // Must be in the provided format:
  REGEX: schema.string({ format: /[a-z]/ }),
}
```

### `schema.number`

Enforces the value to be a valid string representation of a number.

```ts
{
  // Must be in the TCP range (1-65535):
  TCP: schema.number({ range: 'tcp' }),
  // Must be in the range 1-100:
  RANGE: schema.number({ range: [1, 100] }),
}
```

### `schema.boolean`

Enforces the value to be a valid string representation of a boolean.
The following values are considered as a valid booleans and will be parsed:

- `'true', '1'` are parsed to `true`
- `'false', '0'` are parsed to `false`

```ts
{
  BOOL: schema.boolean(),
}
```

### `schema.enum`

Forces the value to be one of the pre-defined values.

```ts
{
  NODE_ENV: schema.enum({
    values: ['production', 'development', 'test'] as const,
    default: 'development'
  }),
}
```

**NOTE:** We use `as const` to allow TypeScript to properly type our enum values.

[clever-env]: https://npmjs.com/clever-env
