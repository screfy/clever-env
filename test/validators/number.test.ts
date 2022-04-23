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
		expectNumberToBeInvalid('5', { range: [1, 3] });
	});

	test('validate default value', () => {
		expectNumberToBeValid('', 6, { default: 6 });
	});

	test('fail with invalid default value', () => {
		expectNumberToBeInvalid('', {
			// @ts-ignore: This is ok:
			default: 'bar'
		});
	});

	test('fail with out of range default value', () => {
		expectNumberToBeInvalid('', {
			range: [1, 5],
			default: 10
		});
	});
});

describe('Number validator (tcp)', () => {
	test('validate provided value', () => {
		expectNumberToBeValid('80', 80, { range: 'tcp' });
	});

	test('fail with invalid value', () => {
		expectNumberToBeInvalid('bar', { range: 'tcp' });
	});

	test('fail with out of range', () => {
		expectNumberToBeInvalid('70000', { range: 'tcp' });
	});

	test('validate default value', () => {
		expectNumberToBeValid('', 6, { range: 'tcp', default: 6 });
	});

	test('fail with invalid default value', () => {
		expectNumberToBeInvalid('', {
			range: 'tcp',
			// @ts-ignore: This is ok:
			default: 'bar'
		});
	});

	test('fail with out of range default value', () => {
		expectNumberToBeInvalid('', {
			range: 'tcp',
			default: 100000
		});
	});
});
