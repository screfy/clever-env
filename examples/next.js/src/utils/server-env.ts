import cleverEnv from 'clever-env';
import { clientEnv } from './client-env';

if (typeof window !== 'undefined') {
	throw new Error(
		'Server environment variables should be used only in the server environment.'
	);
}

export const serverEnv = {
	...clientEnv,
	...cleverEnv((schema) => ({
		NODE_ENV: schema.enum({
			values: ['production', 'development', 'test']
		}),
		SECRET: schema.string()
	}))
};
