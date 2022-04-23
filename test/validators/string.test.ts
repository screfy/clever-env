import {
	expectStringToBeInvalid,
	expectStringToBeValid
} from '../__helpers__/string';

const EXAMPLE_EMAIL = 'admin@domain.com';
const EXAMPLE_URL = 'https://example.com';
const EXAMPLE_UUID = '31436aab-8c5b-41b5-b60e-7909960c94b0';

describe('String validator', () => {
	test('validate provided value', () => {
		expectStringToBeValid('str');
	});
});

describe('String validator (email)', () => {
	test('validate provided value', () => {
		expectStringToBeValid(EXAMPLE_EMAIL, 'email');
	});

	test('fail with invalid value', () => {
		expectStringToBeInvalid('bar', 'email');
	});
});

describe('String validator (url)', () => {
	test('validate provided value', () => {
		expectStringToBeValid(EXAMPLE_URL, 'url');
	});

	test('fail with invalid value', () => {
		expectStringToBeInvalid('bar', 'url');
	});
});

describe('String validator (uuid)', () => {
	test('validate provided value', () => {
		expectStringToBeValid(EXAMPLE_UUID, 'uuid');
	});

	test('fail with invalid value', () => {
		expectStringToBeInvalid('bar', 'uuid');
	});
});

describe('String validator (regex)', () => {
	test('validate provided value', () => {
		expectStringToBeValid('str', /str/);
	});

	test('fail with invalid value', () => {
		expectStringToBeInvalid('bar', /str/);
	});
});
