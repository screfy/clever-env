import { parse, str } from '../../src';
import {
  expectToStrictEqual,
  expectToThrowErrorAndCallConsole
} from '../helpers';

test('validate string', () => {
  const env = parse(
    {
      FOO: str()
    },
    {
      env: { FOO: 'str' }
    }
  );

  expectToStrictEqual<typeof env>(env, { FOO: 'str' });
});

test('fail with regex does not match', () => {
  expectToThrowErrorAndCallConsole(() =>
    parse(
      {
        FOO: str({ regex: /str/ })
      },
      {
        env: { FOO: 'bar' }
      }
    )
  );
});
