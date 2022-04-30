import { cleverEnv, literal, string } from 'clever-env';
import { clientEnv } from './client-env';

if (typeof window !== 'undefined') {
	throw new Error(
		'Server environment variables should be used only in the server environment.'
	);
}

export const serverEnv = {
	...clientEnv,
	...cleverEnv({
		NODE_ENV: literal({
			values: ['production', 'development', 'test']
		}),
		SECRET: string()
	})
};
