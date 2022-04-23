import { expectStringToBeInvalid, expectStringToBeValid } from '../helpers';

const EXAMPLE_EMAIL = 'admin@domain.com';
const EXAMPLE_URL = 'https://example.com';
const EXAMPLE_UUID = '31436aab-8c5b-41b5-b60e-7909960c94b0';

test('validate string', () => {
	expectStringToBeValid('str');
});

test('validate email', () => {
	expectStringToBeValid(EXAMPLE_EMAIL, 'email');
});

test('fail with invalid email', () => {
	expectStringToBeInvalid('bar', 'email');
});

test('validate url', () => {
	expectStringToBeValid(EXAMPLE_URL, 'url');
});

test('fail with invalid url', () => {
	expectStringToBeInvalid('bar', 'url');
});

test('validate uuid', () => {
	expectStringToBeValid(EXAMPLE_UUID, 'uuid');
});

test('fail with invalid uuid', () => {
	expectStringToBeInvalid('bar', 'uuid');
});

test('fail with regex does not match', () => {
	expectStringToBeInvalid('bar', /str/);
});
