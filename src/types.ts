import { InvalidVariableError, MissingVariableError } from './errors';

interface DefaultTypes {
	String: string;
	Number: number;
	Boolean: boolean;
}

type InputType = keyof DefaultTypes | 'Enum';

type OutputType<
	Type extends InputType,
	Values extends readonly string[]
> = Type extends keyof DefaultTypes
	? DefaultTypes[Type]
	: Type extends 'Enum'
	? Values[number]
	: never;

export interface VariableConfig<
	Type extends InputType = InputType,
	Values extends readonly string[] = readonly string[]
> {
	type: Type;
	default?: OutputType<Type, Values>;
	resolve: (key: string, value: string) => OutputType<Type, Values>;
}

export interface BaseVariableOptions<
	Type extends InputType = InputType,
	Values extends readonly string[] = readonly string[]
> {
	default?: OutputType<Type, Values>;
}

export interface StringVariableOptions extends BaseVariableOptions<'String'> {
	format?: 'email' | 'url' | 'uuid' | RegExp;
}

export interface NumberVariableOptions extends BaseVariableOptions<'Number'> {
	range?: 'tcp' | [number, number];
}

export interface EnumVariableOptions<
	Values extends readonly string[] = readonly string[]
> extends BaseVariableOptions<'Enum', Values> {
	values: Values;
}

export interface Options {
	env?: Record<string, string | undefined>;
}

export type EnvironmentVariables<
	Variables extends Record<string, VariableConfig>
> = { [K in keyof Variables]: ReturnType<Variables[K]['resolve']> };

export type ErrorList = (MissingVariableError | InvalidVariableError)[];
