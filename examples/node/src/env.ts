import { cleverEnv, literal, number } from 'clever-env';

export const env = cleverEnv({
	NODE_ENV: literal({
		values: ['production', 'development', 'test'],
		default: 'development'
	}),
	PORT: number({ range: 'tcp' })
});
