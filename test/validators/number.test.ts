import { expectNumberToBeInvalid, expectNumberToBeValid } from '../helpers';

test('validate number', () => {
	expectNumberToBeValid('1', 1);
});

test('fail with invalid value', () => {
	expectNumberToBeInvalid('bar');
});

test('fail with out of range', () => {
	expectNumberToBeInvalid('5', [1, 3]);
});

test('validate port', () => {
	expectNumberToBeValid('80', 80, 'tcp');
});

test('fail with invalid value', () => {
	expectNumberToBeInvalid('bar', 'tcp');
});

test('fail with out of TCP range', () => {
	expectNumberToBeInvalid('70000', 'tcp');
});
