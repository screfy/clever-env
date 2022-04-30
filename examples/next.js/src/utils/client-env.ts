import { cleverEnv, string } from 'clever-env';

export const clientEnv = cleverEnv(
	{
		NEXT_PUBLIC_AUTHOR: string(),
		NEXT_PUBLIC_URL: string({ format: 'url' })
	},
	{
		// Because of how Next.js deals with transpiling public environment
		// variables, we have to put them in as a custom `env` object:
		env: {
			NEXT_PUBLIC_AUTHOR: process.env.NEXT_PUBLIC_AUTHOR,
			NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL
		}
	}
);
