import { TASKS } from '../tasks.js';

export const TASKS_BY_MODULE = {
  html: TASKS.filter((task) => task.module === 'html' || task.id.startsWith('html')),
  css: TASKS.filter((task) => task.module === 'css' || task.id.startsWith('css')),
  js: TASKS.filter((task) => task.module === 'js' || task.id.startsWith('js')),
};
