import { parse, url } from '../../src';
import {
  expectToStrictEqual,
  expectToThrowErrorAndCallConsole
} from '../helpers';

const EXAMPLE_URL = 'https://example.com';

test('validate url', () => {
  const env = parse(
    {
      FOO: url()
    },
    {
      env: { FOO: EXAMPLE_URL }
    }
  );

  expectToStrictEqual<typeof env>(env, { FOO: EXAMPLE_URL });
});

test('fail with invalid url', () => {
  expectToThrowErrorAndCallConsole(() =>
    parse(
      {
        FOO: url()
      },
      {
        env: { FOO: 'bar' }
      }
    )
  );
});
