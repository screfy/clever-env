import cleverEnv from 'clever-env';

export const env = cleverEnv((schema) => ({
	NODE_ENV: schema.enum({
		values: ['production', 'development', 'test'] as const,
		default: 'development'
	}),
	PORT: schema.number({ range: 'tcp' })
}));
