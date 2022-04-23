export class MissingVariableError extends Error {
	public readonly key: string;

	constructor(key: string) {
		super(`${key}: missing value`);

		this.key = key;
	}
}

export class InvalidVariableError extends Error {
	constructor(key: string, value: unknown, type: string) {
		super(
			`${key}: must be ${type}, instead received '${
				typeof value === 'object' ? JSON.stringify(value) : value
			}'`
		);
	}
}
