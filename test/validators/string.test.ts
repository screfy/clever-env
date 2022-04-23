import {
	expectStringToBeInvalid,
	expectStringToBeValid
} from '../__helpers__/string';

const EXAMPLE_EMAIL = 'admin@domain.com';
const EXAMPLE_URL = 'https://example.com';
const EXAMPLE_UUID = '31436aab-8c5b-41b5-b60e-7909960c94b0';

describe('String validator', () => {
	test('validate provided value', () => {
		expectStringToBeValid('foo', 'foo');
	});

	test('validate default value', () => {
		expectStringToBeValid('', 'bar', { default: 'bar' });
	});
});

describe('String validator (email)', () => {
	test('validate provided value', () => {
		expectStringToBeValid(EXAMPLE_EMAIL, EXAMPLE_EMAIL, { format: 'email' });
	});

	test('fail with invalid value', () => {
		expectStringToBeInvalid('bar', { format: 'email' });
	});

	test('validate default value', () => {
		expectStringToBeValid('', EXAMPLE_EMAIL, {
			format: 'email',
			default: EXAMPLE_EMAIL
		});
	});

	test('fail with invalid default value', () => {
		expectStringToBeInvalid('', {
			format: 'email',
			default: 'bar'
		});
	});
});

describe('String validator (url)', () => {
	test('validate provided value', () => {
		expectStringToBeValid(EXAMPLE_URL, EXAMPLE_URL, { format: 'url' });
	});

	test('fail with invalid value', () => {
		expectStringToBeInvalid('bar', { format: 'url' });
	});

	test('validate default value', () => {
		expectStringToBeValid('', EXAMPLE_URL, {
			format: 'url',
			default: EXAMPLE_URL
		});
	});

	test('fail with invalid default value', () => {
		expectStringToBeInvalid('', {
			format: 'url',
			default: 'bar'
		});
	});
});

describe('String validator (uuid)', () => {
	test('validate provided value', () => {
		expectStringToBeValid(EXAMPLE_UUID, EXAMPLE_UUID, { format: 'uuid' });
	});

	test('fail with invalid value', () => {
		expectStringToBeInvalid('bar', { format: 'uuid' });
	});

	test('validate default value', () => {
		expectStringToBeValid('', EXAMPLE_UUID, {
			format: 'uuid',
			default: EXAMPLE_UUID
		});
	});

	test('fail with invalid default value', () => {
		expectStringToBeInvalid('', {
			format: 'uuid',
			default: 'bar'
		});
	});
});

describe('String validator (regex)', () => {
	test('validate provided value', () => {
		expectStringToBeValid('foo', 'foo', { format: /foo/ });
	});

	test('fail with invalid value', () => {
		expectStringToBeInvalid('bar', { format: /foo/ });
	});

	test('validate default value', () => {
		expectStringToBeValid('', 'bar', {
			format: /bar/,
			default: 'bar'
		});
	});

	test('fail with invalid default value', () => {
		expectStringToBeInvalid('', {
			format: /bar/,
			default: 'foo'
		});
	});
});
