import test from 'node:test';
import assert from 'node:assert/strict';

import { TASKS } from '../tasks.js';
import { validateTasksSchema } from '../core/task-schema.js';

test('TASKS schema is valid', () => {
  const errors = validateTasksSchema(TASKS);
  assert.equal(errors.length, 0, `Schema errors:\n${errors.join('\n')}`);
});

test('TASKS contain at least one task per module', () => {
  const modules = new Set(TASKS.map((task) => task.module));
  assert.equal(modules.has('html'), true);
  assert.equal(modules.has('css'), true);
  assert.equal(modules.has('js'), true);
});
