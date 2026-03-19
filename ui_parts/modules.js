import { TASKS_BY_MODULE } from '../data/tasks-by-module.js';

export function buildModules() {
  return [
    {
      id: 'html',
      name: 'HTML',
      icon: '🌐',
      desc: 'Структура веб-страниц. Теги, атрибуты, семантика.',
      color: 'color-html',
      taskIds: TASKS_BY_MODULE.html.map((t) => t.id),
    },
    {
      id: 'css',
      name: 'CSS',
      icon: '🎨',
      desc: 'Стилизация элементов. Цвета, отступы, анимации.',
      color: 'color-css',
      taskIds: TASKS_BY_MODULE.css.map((t) => t.id),
    },
    {
      id: 'js',
      name: 'JavaScript',
      icon: '⚡',
      desc: 'Интерактивность. События, DOM, логика.',
      color: 'color-js',
      taskIds: TASKS_BY_MODULE.js.map((t) => t.id),
    },
  ];
}
