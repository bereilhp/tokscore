import { test } from 'node:test';
import assert from 'node:assert';
import compare from './index.js';

test('calculates f1 correctly for perfect predictions', () => {
  const result = compare("hello", "hello");
  assert.strictEqual(result.precision, 1);
  assert.strictEqual(result.recall, 1);
  assert.strictEqual(result.f1, 1);
});

test('handles empty strings', () => {
  const result = compare("", "");
  assert.strictEqual(result.precision, 1);
  assert.strictEqual(result.recall, 1);
  assert.strictEqual(result.f1, 1);
});

test('handles empty actual with prediction', () => {
  const result = compare("", "hello world");
  assert.strictEqual(result.precision, 0);
  assert.strictEqual(result.recall, 0);
  assert.strictEqual(result.f1, 0);
});

test('handles empty prediction with actual', () => {
  const result = compare("hello world", "");
  assert.strictEqual(result.precision, 0);
  assert.strictEqual(result.recall, 0);
  assert.strictEqual(result.f1, 0);
});

test('is case insensitive', () => {
  const result = compare("HELLO", "hello");
  assert.strictEqual(result.precision, 1);
  assert.strictEqual(result.recall, 1);
  assert.strictEqual(result.f1, 1);
});

test('removes punctuation', () => {
  const result = compare("hello, world!", "hello world");
  assert.strictEqual(result.precision, 1);
  assert.strictEqual(result.recall, 1);
  assert.strictEqual(result.f1, 1);
});

test('calculates partial match correctly', () => {
  const result = compare("hello world foo", "hello world");
  assert.strictEqual(result.precision, 1);
  assert.strictEqual(result.recall, 0.667);
  assert.strictEqual(result.f1, 0.8);
});

test('handles no overlap', () => {
  const result = compare("foo bar", "baz qux");
  assert.strictEqual(result.precision, 0);
  assert.strictEqual(result.recall, 0);
  assert.strictEqual(result.f1, 0);
});

test('counts duplicates correctly', () => {
  const result = compare("hello hello world", "hello world");
  assert.strictEqual(result.precision, 1);
  assert.strictEqual(result.recall, 0.667);
  assert.strictEqual(result.f1, 0.8);
});

test('handles extra predicted tokens', () => {
  const result = compare("hello", "hello world");
  assert.strictEqual(result.precision, 0.5);
  assert.strictEqual(result.recall, 1);
  assert.strictEqual(result.f1, 0.667);
});