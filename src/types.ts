export interface Options {
  env?: { [key: string]: string | undefined };
}

export interface VariableOptions<T> {
  default?: T;
}

export type ValidatorFn<T, O extends VariableOptions<T>> = (
  name: string,
  input: string,
  options: O
) => T;

export interface Validator<T, O = VariableOptions<T>> {
  options: O;
  validate: ValidatorFn<T, O>;
}

export type Schema<Variables> = {
  [K in keyof Variables]: Validator<Variables[K]>;
};
