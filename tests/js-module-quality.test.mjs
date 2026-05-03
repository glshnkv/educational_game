import test from 'node:test';
import assert from 'node:assert/strict';

import { JS_TASKS } from '../tasks/js.js';

function sortedByIndex(tasks) {
  return [...tasks].sort((a, b) => a.moduleIndex - b.moduleIndex);
}

test('JS module has stable structure and progression', () => {
  assert.ok(JS_TASKS.length >= 6, 'Expected at least 6 JS tasks for a complete module');

  const ids = new Set();
  for (const task of JS_TASKS) {
    assert.equal(task.module, 'js', `${task.id}: module must be "js"`);
    assert.match(task.id, /^js-[\w-]+$/, `${task.id}: id must start with "js-"`);
    assert.equal(ids.has(task.id), false, `${task.id}: duplicate id`);
    ids.add(task.id);

    assert.equal(typeof task.moduleIndex, 'number', `${task.id}: moduleIndex must be number`);
    assert.ok(Number.isInteger(task.moduleIndex), `${task.id}: moduleIndex must be integer`);
    assert.ok(task.moduleIndex >= 1, `${task.id}: moduleIndex must be >= 1`);

    assert.equal(typeof task.theory, 'string', `${task.id}: theory must be string`);
    assert.ok(task.theory.trim().length >= 400, `${task.id}: theory is too short for learning flow`);

    assert.equal(typeof task.starterCode, 'string', `${task.id}: starterCode must be string`);
    assert.match(task.starterCode, /<script>/i, `${task.id}: starterCode must include <script>`);

    assert.equal(typeof task.check, 'function', `${task.id}: check must be function`);
  }

  const indexed = sortedByIndex(JS_TASKS);
  indexed.forEach((task, i) => {
    const expected = i + 1;
    assert.equal(task.moduleIndex, expected, `${task.id}: expected moduleIndex ${expected}`);
  });
});

test('JS task checks reject empty and comment-only scripts', () => {
  const emptyScript = '<script></script>';
  const commentedScript = `<script>\n// doneBtn.addEventListener('click', () => {})\n/* if (hasBadge && level >= 2) {} */\n</script>`;

  for (const task of JS_TASKS) {
    const emptyResult = task.check(emptyScript);
    assert.equal(emptyResult.ok, false, `${task.id}: empty script must not pass`);

    const commentedResult = task.check(commentedScript);
    assert.equal(commentedResult.ok, false, `${task.id}: commented script must not pass`);
  }
});
