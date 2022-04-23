import { VariableOptions, ValidatorFn, Validator } from '../types';

export function createValidator<T, O = VariableOptions<T>>(
	validator: ValidatorFn<T, O>
): (options?: O) => Validator<T, O> {
	return (options = {} as O) => ({ options, validator });
}
