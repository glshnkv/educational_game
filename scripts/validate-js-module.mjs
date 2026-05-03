import { JS_TASKS } from '../tasks/js.js';

const errors = [];

if (JS_TASKS.length < 6) {
  errors.push(`Expected at least 6 JS tasks, got ${JS_TASKS.length}`);
}

const seenIds = new Set();
for (const task of JS_TASKS) {
  if (task.module !== 'js') errors.push(`${task.id}: module must be "js"`);
  if (!/^js-[\w-]+$/.test(task.id)) errors.push(`${task.id}: id must start with "js-"`);
  if (seenIds.has(task.id)) errors.push(`${task.id}: duplicate id`);
  seenIds.add(task.id);

  if (!Number.isInteger(task.moduleIndex) || task.moduleIndex < 1) {
    errors.push(`${task.id}: moduleIndex must be a positive integer`);
  }

  if (typeof task.theory !== 'string' || task.theory.trim().length < 400) {
    errors.push(`${task.id}: theory should have at least 400 chars`);
  }

  if (typeof task.starterCode !== 'string' || !/<script>/i.test(task.starterCode)) {
    errors.push(`${task.id}: starterCode must include <script>`);
  }
}

const sorted = [...JS_TASKS].sort((a, b) => a.moduleIndex - b.moduleIndex);
sorted.forEach((task, i) => {
  const expected = i + 1;
  if (task.moduleIndex !== expected) {
    errors.push(`${task.id}: expected moduleIndex ${expected}, got ${task.moduleIndex}`);
  }
});

if (errors.length > 0) {
  console.error('JS module validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`JS module is valid. Tasks: ${JS_TASKS.length}`);
