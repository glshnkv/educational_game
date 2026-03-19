import { TASKS } from '../tasks.js';
import { validateTasksSchema } from '../core/task-schema.js';

const errors = validateTasksSchema(TASKS);
if (errors.length > 0) {
  console.error('Task schema validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Task schema is valid. Total tasks: ${TASKS.length}`);
