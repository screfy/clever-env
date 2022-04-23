import {
	expectNumberToBeInvalid,
	expectNumberToBeValid
} from '../__helpers__/number';

describe('Number validator', () => {
	test('validate provided value', () => {
		expectNumberToBeValid('1', 1);
	});

	test('fail with invalid value', () => {
		expectNumberToBeInvalid('bar');
	});

	test('fail with out of range', () => {
		expectNumberToBeInvalid('5', [1, 3]);
	});
});

describe('Number validator (tcp)', () => {
	test('validate provided value', () => {
		expectNumberToBeValid('80', 80, 'tcp');
	});

	test('fail with invalid value', () => {
		expectNumberToBeInvalid('bar', 'tcp');
	});

	test('fail with out of range', () => {
		expectNumberToBeInvalid('70000', 'tcp');
	});
});
