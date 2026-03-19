export function validateTasksSchema(tasks) {
  const errors = [];
  const ids = new Set();
  const allowedModules = new Set(['html', 'css', 'js']);

  tasks.forEach((task, index) => {
    const where = `tasks[${index}]`;
    if (!task || typeof task !== 'object') {
      errors.push(`${where}: expected object`);
      return;
    }

    if (!task.id || typeof task.id !== 'string') errors.push(`${where}: missing string id`);
    if (ids.has(task.id)) errors.push(`${where}: duplicate id "${task.id}"`);
    ids.add(task.id);

    if (!allowedModules.has(task.module)) {
      errors.push(`${where}: unknown module "${task.module}"`);
    }

    if (typeof task.title !== 'string' || !task.title.trim()) {
      errors.push(`${where}: missing title`);
    }
    if (typeof task.starterCode !== 'string') {
      errors.push(`${where}: starterCode must be string`);
    }
    if (typeof task.check !== 'function') {
      errors.push(`${where}: check must be function`);
    }
  });

  return errors;
}
