import test from 'node:test';
import assert from 'node:assert/strict';

import { TASKS } from '../tasks.js';

const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

class FakeElement {
  constructor(tagName = 'root', attributes = {}) {
    this.tagName = tagName.toLowerCase();
    this.attributes = attributes;
    this.children = [];
    this._text = '';
  }

  set innerHTML(html) {
    this.children = [];
    this._text = '';
    parseHtmlInto(this, html);
  }

  get textContent() {
    return `${this._text}${this.children.map((child) => child.textContent).join('')}`;
  }

  getAttribute(name) {
    return this.attributes[name] ?? null;
  }

  querySelector(selector) {
    return this.querySelectorAll(selector)[0] || null;
  }

  querySelectorAll(selector) {
    const result = [];
    const visit = (node) => {
      for (const child of node.children) {
        if (matchesSelector(child, selector)) result.push(child);
        visit(child);
      }
    };
    visit(this);
    return result;
  }
}

function parseHtmlInto(root, html) {
  const stack = [root];
  const tokenRe = /<!--[\s\S]*?-->|<!DOCTYPE[^>]*>|<\/?[a-z][^>]*>|[^<]+/gi;
  let token = tokenRe.exec(html);

  while (token) {
    const raw = token[0];
    const parent = stack[stack.length - 1];

    if (raw.startsWith('</')) {
      const tagName = raw.slice(2, -1).trim().toLowerCase();
      while (stack.length > 1 && stack[stack.length - 1].tagName !== tagName) stack.pop();
      if (stack.length > 1) stack.pop();
    } else if (raw.startsWith('<') && !raw.startsWith('<!--') && !raw.startsWith('<!')) {
      const [, tagName, rawAttributes = ''] = raw.match(/^<([a-z][\w-]*)([^>]*)>/i) || [];
      if (tagName) {
        const element = new FakeElement(tagName, parseAttributes(rawAttributes));
        parent.children.push(element);
        if (!voidTags.has(tagName.toLowerCase()) && !raw.endsWith('/>')) stack.push(element);
      }
    } else if (!raw.startsWith('<!--') && !raw.startsWith('<!')) {
      parent._text += raw;
    }

    token = tokenRe.exec(html);
  }
}

function parseAttributes(rawAttributes) {
  const attributes = {};
  const attrRe = /([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let match = attrRe.exec(rawAttributes);
  while (match) {
    attributes[match[1]] = match[2] ?? match[3] ?? match[4] ?? '';
    match = attrRe.exec(rawAttributes);
  }
  return attributes;
}

function matchesSelector(element, selector) {
  const match = selector.match(/^([a-z][\w-]*)?(?:\.([\w-]+))?(?:\[([\w-]+)(?:=["']?([^"'\]]+)["']?)?\])?$/i);
  if (!match) return false;

  const [, tagName, className, attrName, attrValue] = match;
  if (tagName && element.tagName !== tagName.toLowerCase()) return false;
  if (className && !String(element.attributes.class || '').split(/\s+/).includes(className)) return false;
  if (attrName && !(attrName in element.attributes)) return false;
  if (attrName && attrValue !== undefined && element.attributes[attrName] !== attrValue) return false;
  return true;
}

globalThis.document = {
  createElement(tagName) {
    return new FakeElement(tagName);
  },
};

const SOLUTIONS = {
  'html-1-tags': `<h1>Добро пожаловать в Кодликс!</h1>
<p>Мы рады видеть тебя в нашей команде.</p>
<p>Здесь ты будешь <b>создавать крутые сайты</b> каждый день.</p>`,
  'html-2-attributes': `<h2>О компании Кодликс</h2>
<p>Мы делаем интернет лучше с 2010 года.</p>
<a href="https://kodlix.ru">Наш сайт</a>
<img src="logo.png" alt="Логотип Кодликс">`,
  'html-3-lists': `<h2>Задачи на спринт</h2>
<ul>
  <li>Починить баги на главной</li>
  <li>Обновить дизайн кнопок</li>
  <li>Написать документацию</li>
</ul>
<h2>Приоритеты</h2>
<ol>
  <li>Критические баги</li>
  <li>Новые фичи</li>
</ol>`,
  'html-4-tables': `<table>
  <tr><th>Имя</th><th>Отдел</th><th>Email</th></tr>
  <tr><td>Иван Петров</td><td>Разработка</td><td>ivan@kodlix.ru</td></tr>
  <tr><td>Анна Смирнова</td><td>Дизайн</td><td>anna@kodlix.ru</td></tr>
</table>`,
  'html-5-forms': `<form>
  <input type="text" placeholder="Имя">
  <input type="email" placeholder="Email">
  <textarea placeholder="Сообщение"></textarea>
  <button type="submit">Отправить</button>
</form>`,
  'html-6-divspan': `<div class="card">
  <h3>Новая версия портала</h3>
  <p>Новость опубликована <span class="date">02.05.2026</span></p>
  <a href="/news">Читать далее</a>
</div>`,
  'html-7-semantic': `<header>
  <h1>Кодликс</h1>
  <nav>
    <a href="#">Главная</a>
    <a href="#">О нас</a>
    <a href="#">Контакты</a>
  </nav>
</header>
<main>
  <h2>Лучший поиск в рунете</h2>
  <p>Мы индексируем миллиарды страниц каждый день.</p>
</main>
<footer>
  <p>2024 Кодликс. Все права защищены.</p>
</footer>`,
  'html-8-document': `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <title>Вакансии Кодликса</title>
  </head>
  <body>
    <h1>Вакансии Кодликса</h1>
    <p>Ищем сильных frontend-разработчиков.</p>
  </body>
</html>`,
  'css-1-syntax': `<style>
h1 { color: #2563eb; }
.subtitle { color: #64748b; }
p { font-size: 16px; }
</style>`,
  'css-2-boxmodel': `<style>
.card {
  padding: 20px;
  margin: 16px;
  border: 2px solid #3b82f6;
  border-radius: 12px;
  width: 280px;
}
</style>`,
  'css-3-typography': `<style>
h1 {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
}
.lead {
  font-style: italic;
  color: #555;
}
p {
  line-height: 1.7;
}
</style>`,
  'css-4-backgrounds': `<style>
.header {
  background-color: #111827;
  color: white;
}
.banner {
  background: linear-gradient(135deg, #2563eb, #16a34a);
  color: white;
  padding: 40px;
}
</style>`,
  'css-5-flexbox': `<style>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.card {
  width: 200px;
}
</style>`,
  'css-6-hover': `<style>
.btn {
  transition: all 0.3s ease;
  cursor: pointer;
}
.btn:hover {
  background-color: #1d4ed8;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}
</style>`,
  'css-7-position': `<style>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
.card {
  position: relative;
}
.badge {
  position: absolute;
  top: 12px;
  right: 12px;
}
</style>`,
  'js-counter': `<p id="counter">Закрыто задач: 0</p>
<button id="doneBtn">Закрыть задачу</button>
<script>
let done = 0;
const counterEl = document.getElementById('counter');
const doneBtn = document.getElementById('doneBtn');

doneBtn.addEventListener('click', () => {
  done++;
  counterEl.textContent = 'Закрыто задач: ' + done;
});
</script>`,
  'js-2-access': `<script>
const hasBadge = true;
const level = 2;
let accessMessage = '';

if (hasBadge && level >= 2) {
  accessMessage = 'Доступ разрешён';
} else {
  accessMessage = 'Доступ запрещён';
}
</script>`,
  'js-3-loops': `<script>
const tickets = ['Баг кнопки', 'Верстка', 'Ошибка формы', 'Счётчик', 'Меню'];
let report = '';

for (let i = 0; i < tickets.length; i++) {
  report += (i + 1) + '. ' + tickets[i] + '\\n';
}
</script>`,
  'js-4-functions': `<script>
function makeGreeting(name, role) {
  return 'Привет, ' + name + '! Ты назначен на роль: ' + role + '.';
}
</script>`,
  'js-5-objects': `<script>
const team = [
  { name: 'Маша', role: 'Frontend', tasksDone: 4 },
  { name: 'Саша', role: 'Teamlead', tasksDone: 7 },
  { name: 'Артём', role: 'Manager', tasksDone: 3 },
];
let totalDone = 0;

for (let i = 0; i < team.length; i++) {
  totalDone += team[i].tasksDone;
}
</script>`,
  'js-6-dom-toggle': `<p id="serverStatus">Статус: Норма</p>
<button id="toggleBtn">Переключить статус</button>
<script>
let isOverload = false;
const serverStatus = document.getElementById('serverStatus');
const toggleBtn = document.getElementById('toggleBtn');

toggleBtn.addEventListener('click', () => {
  isOverload = !isOverload;
  serverStatus.textContent = isOverload ? 'Статус: Перегрузка' : 'Статус: Норма';
});
</script>`,
};

test('every task has an accepted reference solution', () => {
  const missingSolutions = TASKS.filter((task) => !SOLUTIONS[task.id]).map((task) => task.id);
  assert.deepEqual(missingSolutions, []);

  for (const task of TASKS) {
    const result = task.check(SOLUTIONS[task.id]);
    assert.equal(result.ok, true, `${task.id}: ${result.hint || 'solution rejected'}`);
  }
});

test('JavaScript starters are not accepted through commented hints', () => {
  for (const task of TASKS.filter((item) => item.module === 'js')) {
    const result = task.check(task.starterCode);
    assert.equal(result.ok, false, `${task.id}: starter code must not pass validation`);
  }
});
