# clever-env

[`clever-env`][clever-env] validates, sanitizes environment variables and parses them to the right type.

With this library, you can make sure you don't accidentally deploy your application with missing or invalid environment variables.

## Installation

```bash
# With NPM:
npm install clever-env

# With Yarn:
yarn add clever-env

# With pnpm:
pnpm add clever-env
```

## Usage

```ts
import { parse, literal, port, str, url } from 'clever-env';

const env = parse({
  NODE_ENV: literal({
    values: ['production', 'development', 'test'],
    default: 'development'
  }),
  PORT: port(),
  URL: url(),
  GITHUB_USERNAME: str({
    default: 'screfy'
  })
});
```

It defaults to using `process.env` as a base for parsing environment variables, but it can be overridden like this:

```ts
import { parse, literal } from 'clever-env';

const env = parse(
  {
    NODE_ENV: literal({
      values: ['production', 'development', 'test'],
      default: 'development'
    })
  },
  {
    env: { NODE_ENV: 'test' }
  }
);
```

## Validators

The library comes with the following built-in validators:

| Validator                       | Return type                     | Description                                                                                        |
| ------------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------- |
| [`str()`](#str-validator)       | `string`                        | Ensures an environment variable is a string and is not undefined or empty.                         |
| [`num()`](#num-validator)       | `number`                        | Parses an environment variable into a valid number.                                                |
| `bool()`                        | `boolean`                       | Parses an environment variable (`'true'`, `'1'`, `'false'`, or `'f'`) into boolean.                |
| `port()`                        | `number`                        | Parses an environment variable into a valid number and ensures that is in the TCP range (1-65535). |
| `email()`                       | `string`                        | Ensures an environment variable is a valid email address.                                          |
| `uuid()`                        | `string`                        | Ensures an environment variable is a valid UUID.                                                   |
| `url()`                         | `string`                        | Ensures an environment variable is a valid URL address.                                            |
| `json()`                        | `Record<string, unknown>` / `T` | Parses an environment variable into a JSON object.                                                 |
| [`literal`](#literal-validator) | `string` / `T`                  | Ensures an environment variable is in a specified `values` list.                                   |

## Validator options

Every validator has the following options:

| Name      | Type | Description                                                                         |
| --------- | ---- | ----------------------------------------------------------------------------------- |
| `default` | `T`  | A fallback value, which will be used if the environment variable was not specified. |

Some validators have their own options:

#### `str()` validator

| Name    | Type     | Description                                                   |
| ------- | -------- | ------------------------------------------------------------- |
| `regex` | `RegExp` | Ensures an environment variable matches a regular expression. |

#### `num()` validator

| Name    | Type               | Description                                                 |
| ------- | ------------------ | ----------------------------------------------------------- |
| `regex` | `[number, number]` | Ensures an environment variable is in the range of numbers. |

#### `literal()` validator

| Name     | Type       | Description                                               |
| -------- | ---------- | --------------------------------------------------------- |
| `values` | `string[]` | Ensures an environment variable is in the list of values. |

## Custom validators

You can create a custom validator and use it like others, e.g.:

```ts
import {
  parse,
  createValidator,
  VariableOptions,
  InvalidVariableError
} from 'clever-env';

interface LengthValidatorOptions extends VariableOptions<string> {
  length?: number;
}

const lengthValidator = createValidator<string, LengthValidatorOptions>(
  (name, input, options) => {
    if (options.length && input.length !== options.length) {
      throw new InvalidVariableError(
        name,
        `must be ${options.length} characters long`
      );
    }

    return input;
  }
);

const env = parse({
  USERNAME: lengthValidator({
    length: 12
  })
});
```

[clever-env]: https://npmjs.com/clever-env
