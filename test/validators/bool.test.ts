import { bool, parse } from '../../src';
import {
  expectToStrictEqual,
  expectToThrowErrorAndCallConsole
} from '../helpers';

test('validate boolean', () => {
  const env = parse(
    {
      TRUE_1: bool(),
      TRUE_2: bool(),
      FALSE_1: bool(),
      FALSE_2: bool()
    },
    {
      env: {
        TRUE_1: 'true',
        TRUE_2: '1',
        FALSE_1: 'false',
        FALSE_2: '0'
      }
    }
  );

  expectToStrictEqual<typeof env>(env, {
    TRUE_1: true,
    TRUE_2: true,
    FALSE_1: false,
    FALSE_2: false
  });
});

test('fail with invalid value', () => {
  expectToThrowErrorAndCallConsole(() =>
    parse(
      {
        FOO: bool()
      },
      {
        env: { FOO: 'bar' }
      }
    )
  );
});
