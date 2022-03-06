import { num, parse, str } from '../src';
import {
  expectToStrictEqual,
  expectToThrowErrorAndCallConsole
} from './helpers';

test('custom environment', () => {
  const env = parse(
    {
      FOO: str()
    },
    {
      env: { FOO: 'bar' }
    }
  );

  expectToStrictEqual<typeof env>(env, { FOO: 'bar' });
});

test('missing variable', () => {
  expectToThrowErrorAndCallConsole(() =>
    parse(
      {
        FOO: str()
      },
      {
        env: {}
      }
    )
  );
});

test('default values', () => {
  const env = parse({
    FOO: str({ default: 'bar' }),
    BAR: num({ default: 1 })
  });

  expectToStrictEqual<typeof env>(env, {
    FOO: 'bar',
    BAR: 1
  });
});
