// ============================================================
// JAVASCRIPT TASKS
// ============================================================

export const JS_TASKS = [
  // ── JS ЗАДАНИЕ 1: Счётчик и события ──────────────────────
  {
    id: 'js-counter',
    module: 'js',
    moduleIndex: 1,
    title: 'JavaScript: Счётчик закрытых тикетов',
    npc: 'colleague2',
    context: `
      🧪 <b>Саша машет тебе из-за монитора:</b><br><br>
      <i>«Дима, у нас демо для тимлида через 10 минут. На панели стажёра есть кнопка
      "Закрыть задачу", но цифра "Закрыто задач" не меняется. Нужен JavaScript:
      по клику увеличиваем счётчик и сразу обновляем текст в интерфейсе.»</i><br><br>
      Пора запускать первый рабочий скрипт в «Шмякдексе».
    `,
    theory: `
      <b>Что такое JavaScript и зачем он нужен?</b><br><br>
      HTML создаёт структуру страницы, CSS отвечает за стиль, а JavaScript делает страницу <b>живой</b>:
      реагирует на клики, меняет текст, запускает логику.<br><br>

      <b>Три шага для интерактива:</b><br>
      1. Найти элементы страницы (кнопку и текст).<br>
      2. Повесить обработчик события <code>click</code> на кнопку.<br>
      3. Изменять значение счётчика и текст на экране.<br><br>

      Пример:
      <pre><code>let count = 0;
const btn = document.getElementById('btn');
const out = document.getElementById('out');

btn.addEventListener('click', () => {
  count++;
  out.textContent = 'Счёт: ' + count;
});</code></pre>
    `,
    description: `
      ✏️ <b>Задание:</b> Почини панель стажёра.<br><br>
      Внутри <code>&lt;script&gt;</code> нужно:<br>
      1. Повесить обработчик клика на кнопку <code>doneBtn</code>.<br>
      2. При каждом клике увеличивать <code>done</code> на 1.<br>
      3. Обновлять текст абзаца <code>counterEl</code> в формате:
      <code>Закрыто задач: число</code>.
    `,
    starterCode: `<p id="counter">Закрыто задач: 0</p>
<button id="doneBtn">Закрыть задачу</button>

<script>
let done = 0;
const counterEl = document.getElementById('counter');
const doneBtn = document.getElementById('doneBtn');

// TODO: добавь обработчик click
// done++;
// counterEl.textContent = 'Закрыто задач: ' + done;
</script>`,
    check(code) {
      const script = (code.match(/<script[^>]*>([\s\S]*?)<\/script>/i) || [])[1] || '';
      if (!/addEventListener\s*\(\s*['"]click['"]/.test(script))
        return { ok: false, hint: 'Добавь обработчик клика: doneBtn.addEventListener("click", ...)' };
      if (!/\+\+|=\s*done\s*\+\s*1|=\s*1\s*\+\s*done/.test(script))
        return { ok: false, hint: 'Внутри обработчика увеличь счётчик: done++;' };
      if (!/counterEl\s*\.\s*textContent\s*=/.test(script))
        return { ok: false, hint: 'Обнови текст абзаца через counterEl.textContent = ...' };
      if (!/Закрыто\s+задач/.test(script))
        return { ok: false, hint: 'Текст должен содержать фразу «Закрыто задач: ...»' };
      return { ok: true };
    },
    reward: '🏅 Отличный старт! Счётчик ожил, и Саша одобрительно кивает.',
    colleagueTips: [
      { npc: 'colleague2', lines: [
        'Сначала найди кнопку и подпишись на событие click.',
        'Внутри колбэка увеличь переменную done.',
        'После этого сразу перерисуй текст через textContent.',
      ]},
      { npc: 'colleague1', lines: [
        'Маша! Схема простая: click -> done++ -> обновили строку.',
        'Текст можно собрать так: "Закрыто задач: " + done.',
        'Главное, чтобы код был внутри script.',
      ]},
    ],
  },

  // ── JS ЗАДАНИЕ 2: Условия if/else ────────────────────────
  {
    id: 'js-2-access',
    module: 'js',
    moduleIndex: 2,
    title: 'JavaScript: Доступ в серверную',
    npc: 'boss',
    context: `
      🔐 <b>Артём даёт новую задачу:</b><br><br>
      <i>«Нужна проверка доступа в серверную. Пропускаем только тех, у кого есть бейдж
      и уровень не ниже 2. Сделай условие, чтобы система писала правильный статус.»</i>
    `,
    theory: `
      <b>Условия в JavaScript</b><br><br>
      Условия позволяют программе выбирать поведение.<br>
      Если условие истинно — выполняется один блок, иначе другой:<br>
      <pre><code>if (условие) {
  // если true
} else {
  // если false
}</code></pre>

      <b>Полезные операторы:</b><br>
      <code>&amp;&amp;</code> — И (оба условия должны быть true)<br>
      <code>||</code> — ИЛИ (достаточно одного true)<br>
      <code>&gt;=</code> — больше или равно
    `,
    description: `
      ✏️ <b>Задание:</b> допиши проверку доступа.<br><br>
      Если <code>hasBadge</code> равно <code>true</code> и <code>level &gt;= 2</code>,
      присвой в <code>accessMessage</code> строку «Доступ разрешён».<br>
      Иначе присвой «Доступ запрещён».
    `,
    starterCode: `<script>
const hasBadge = true;
const level = 1;
let accessMessage = '';

// TODO: добавь if/else

console.log(accessMessage);
</script>`,
    check(code) {
      const script = (code.match(/<script[^>]*>([\s\S]*?)<\/script>/i) || [])[1] || '';
      if (!/\bif\s*\(/.test(script))
        return { ok: false, hint: 'Добавь конструкцию if (...) { ... } else { ... }' };
      if (!/hasBadge/.test(script) || !/level\s*>=\s*2/.test(script))
        return { ok: false, hint: 'В условии должны участвовать hasBadge и проверка level >= 2' };
      if (!/Доступ разрешён/.test(script) || !/Доступ запрещён/.test(script))
        return { ok: false, hint: 'Присвой в accessMessage обе строки: «Доступ разрешён» и «Доступ запрещён»' };
      return { ok: true };
    },
    reward: '🏅 Проверка доступа работает. Серверная под контролем.',
    colleagueTips: [
      { npc: 'colleague1', lines: [
        'Маша! Используй логическое И: hasBadge && level >= 2.',
        'В if пиши разрешён, в else запрещён.',
        'Не забудь именно присвоение в accessMessage.',
      ]},
      { npc: 'colleague2', lines: [
        'Саша. Нужен простой gate: if (...) { ... } else { ... }',
        'Проверь, что level сравнивается через >= 2.',
        'Строки должны совпадать с условием задания.',
      ]},
    ],
  },

  // ── JS ЗАДАНИЕ 3: Циклы ──────────────────────────────────
  {
    id: 'js-3-loops',
    module: 'js',
    moduleIndex: 3,
    title: 'JavaScript: Авто-отчёт по тикетам',
    npc: 'colleague1',
    context: `
      📋 <b>Маша просит помощь:</b><br><br>
      <i>«У меня 5 тикетов, и я устала нумеровать их руками.
      Давай сделаем автогенерацию отчёта через цикл?»</i>
    `,
    theory: `
      <b>Циклы в JavaScript</b><br><br>
      Цикл повторяет действие много раз.<br><br>

      <b>for</b> удобно использовать, когда знаем, сколько элементов нужно пройти:
      <pre><code>for (let i = 0; i < arr.length; i++) {
  // работаем с arr[i]
}</code></pre>

      <b>while</b> работает, пока условие истинно:
      <pre><code>let i = 0;
while (i < 5) {
  i++;
}</code></pre>
    `,
    description: `
      ✏️ <b>Задание:</b> собери текст отчёта в переменную <code>report</code>.<br><br>
      Используй цикл <code>for</code> по массиву <code>tickets</code>.
      Добавляй строки в формате: <code>1. Название тикета</code>, <code>2. ...</code> и так далее.
    `,
    starterCode: `<script>
const tickets = ['Баг кнопки', 'Верстка', 'Ошибка формы', 'Счётчик', 'Меню'];
let report = '';

// TODO: цикл for и сборка report

console.log(report);
</script>`,
    check(code) {
      const script = (code.match(/<script[^>]*>([\s\S]*?)<\/script>/i) || [])[1] || '';
      if (!/\bfor\s*\(/.test(script))
        return { ok: false, hint: 'Используй цикл for для обхода массива tickets.' };
      if (!/tickets\s*\.\s*length/.test(script))
        return { ok: false, hint: 'В условии цикла используй tickets.length.' };
      if (!/report\s*\+?=/.test(script))
        return { ok: false, hint: 'Добавляй строки в переменную report через +=.' };
      if (!/i\s*\+\s*1|1\s*\+\s*i/.test(script))
        return { ok: false, hint: 'Используй нумерацию с i + 1.' };
      return { ok: true };
    },
    reward: '🏅 Отчёт собирается автоматически. Маша в восторге.',
    colleagueTips: [
      { npc: 'colleague1', lines: [
        'Схема цикла: i = 0; i < tickets.length; i++.',
        'Берёшь тикет так: tickets[i].',
        'Номер пункта — это i + 1.',
      ]},
      { npc: 'colleague2', lines: [
        'Саша. Не забывай инициализировать report пустой строкой.',
        'Внутри цикла каждый проход добавляет одну строку.',
        'Используй += чтобы не перезаписывать прошлый текст.',
      ]},
    ],
  },

  // ── JS ЗАДАНИЕ 4: Функции ────────────────────────────────
  {
    id: 'js-4-functions',
    module: 'js',
    moduleIndex: 4,
    title: 'JavaScript: Функция приветствия',
    npc: 'boss',
    context: `
      📣 <b>Артём ставит практичную задачу:</b><br><br>
      <i>«У нас одинаковый текст приветствия для разных сотрудников.
      Сделай функцию, чтобы не копировать код десять раз.»</i>
    `,
    theory: `
      <b>Функции</b><br><br>
      Функция — это переиспользуемый блок кода.<br>
      Она может получать параметры и возвращать результат через <code>return</code>.<br><br>
      <pre><code>function makeGreeting(name, role) {
  return 'Привет, ' + name + '! Роль: ' + role;
}</code></pre>
    `,
    description: `
      ✏️ <b>Задание:</b> создай функцию <code>makeGreeting(name, role)</code>,
      которая возвращает строку:<br>
      <code>Привет, &lt;name&gt;! Ты назначен на роль: &lt;role&gt;.</code>
    `,
    starterCode: `<script>
// TODO: создай функцию makeGreeting(name, role)

const msg = makeGreeting('Маша', 'Frontend');
console.log(msg);
</script>`,
    check(code) {
      const script = (code.match(/<script[^>]*>([\s\S]*?)<\/script>/i) || [])[1] || '';
      if (!/function\s+makeGreeting\s*\(\s*name\s*,\s*role\s*\)/.test(script))
        return { ok: false, hint: 'Создай функцию: function makeGreeting(name, role) { ... }' };
      if (!/\breturn\b/.test(script))
        return { ok: false, hint: 'Функция должна возвращать строку через return.' };
      if (!/Привет/.test(script) || !/роль/.test(script))
        return { ok: false, hint: 'Верни строку приветствия с именем и ролью.' };
      return { ok: true };
    },
    reward: '🏅 Отлично! Код стал аккуратнее за счёт функции.',
    colleagueTips: [
      { npc: 'colleague2', lines: [
        'Саша. Сигнатура функции должна быть ровно makeGreeting(name, role).',
        'Данные приходят через параметры, не захардкоживай имена.',
        'Не забудь return, иначе снаружи будет undefined.',
      ]},
      { npc: 'colleague1', lines: [
        'Маша! Внутри функции собери строку и верни её.',
        'Можно собрать строку через плюс.',
        'После этого вызов makeGreeting(...) начнёт работать.',
      ]},
    ],
  },

  // ── JS ЗАДАНИЕ 5: Массивы и объекты ──────────────────────
  {
    id: 'js-5-objects',
    module: 'js',
    moduleIndex: 5,
    title: 'JavaScript: База команды',
    npc: 'colleague1',
    context: `
      🗃️ <b>Маша ведёт учёт задач команды:</b><br><br>
      <i>«Нужен мини-реестр сотрудников: имя, роль, сколько задач закрыто.
      И сразу общая сумма по команде. Поможешь?»</i>
    `,
    theory: `
      <b>Объекты и массивы</b><br><br>
      Объект хранит свойства:
      <pre><code>const user = { name: 'Маша', tasksDone: 3 };</code></pre>
      Массив хранит список значений:
      <pre><code>const team = [user1, user2, user3];</code></pre>
      Чтобы пройти по массиву и посчитать сумму, используют цикл.
    `,
    description: `
      ✏️ <b>Задание:</b><br>
      1. Создай массив <code>team</code> из 3 объектов сотрудников.<br>
      2. У каждого объекта должны быть поля: <code>name</code>, <code>role</code>, <code>tasksDone</code>.<br>
      3. Посчитай общее число задач в переменной <code>totalDone</code>.
    `,
    starterCode: `<script>
// TODO: создай массив team из 3 объектов
const team = [];
let totalDone = 0;

// TODO: пройди по team и посчитай сумму tasksDone

console.log(totalDone);
</script>`,
    check(code) {
      const script = (code.match(/<script[^>]*>([\s\S]*?)<\/script>/i) || [])[1] || '';
      if (!/const\s+team\s*=\s*\[/.test(script))
        return { ok: false, hint: 'Создай массив team: const team = [ ... ];' };
      const tasksDoneMatches = script.match(/tasksDone\s*:/g) || [];
      if (tasksDoneMatches.length < 3)
        return { ok: false, hint: 'В массиве должно быть 3 объекта с полем tasksDone.' };
      if (!/totalDone\s*=/.test(script))
        return { ok: false, hint: 'Используй переменную totalDone для подсчёта суммы.' };
      if (!/\bfor\s*\(|forEach\s*\(/.test(script))
        return { ok: false, hint: 'Посчитай сумму через цикл for или forEach.' };
      return { ok: true };
    },
    reward: '🏅 Мини-база команды готова. Данные собраны корректно.',
    colleagueTips: [
      { npc: 'colleague1', lines: [
        'Один сотрудник — один объект в фигурных скобках.',
        'Команда — это массив из нескольких объектов.',
        'Сумму tasksDone посчитай в цикле и добавляй в totalDone.',
      ]},
      { npc: 'colleague2', lines: [
        'Саша. Проверь, что tasksDone это число, а не строка.',
        'Если используешь for: totalDone += team[i].tasksDone;',
        'Нужно три сотрудника, не меньше.',
      ]},
    ],
  },

  // ── JS ЗАДАНИЕ 6: DOM и переключение состояния ───────────
  {
    id: 'js-6-dom-toggle',
    module: 'js',
    moduleIndex: 6,
    title: 'JavaScript: Статус серверов',
    npc: 'boss',
    context: `
      🚦 <b>Финал JS-модуля.</b><br><br>
      Артём просит тебя сделать реальный UI-контрол:
      кнопка должна переключать статус серверов между «Норма» и «Перегрузка».<br><br>
      <i>«Если справишься — считай JavaScript-модуль закрыт.»</i>
    `,
    theory: `
      <b>DOM + события = управление интерфейсом</b><br><br>
      Ты можешь менять текст и классы у элементов прямо из JavaScript.<br>
      Частый паттерн: хранить состояние в переменной и переключать его по клику.<br><br>
      <pre><code>let isOn = false;
btn.addEventListener('click', () => {
  isOn = !isOn;
  label.textContent = isOn ? 'ВКЛ' : 'ВЫКЛ';
});</code></pre>
    `,
    description: `
      ✏️ <b>Задание:</b><br>
      По клику на кнопку <code>toggleBtn</code> переключай переменную <code>isOverload</code>.
      Обновляй текст элемента <code>serverStatus</code>:<br>
      — если перегрузка: «Статус: Перегрузка»<br>
      — иначе: «Статус: Норма»
    `,
    starterCode: `<p id="serverStatus">Статус: Норма</p>
<button id="toggleBtn">Переключить статус</button>

<script>
let isOverload = false;
const serverStatus = document.getElementById('serverStatus');
const toggleBtn = document.getElementById('toggleBtn');

// TODO: добавь обработчик click и переключение состояния
</script>`,
    check(code) {
      const script = (code.match(/<script[^>]*>([\s\S]*?)<\/script>/i) || [])[1] || '';
      if (!/addEventListener\s*\(\s*['"]click['"]/.test(script))
        return { ok: false, hint: 'Добавь обработчик click на кнопку toggleBtn.' };
      if (!/isOverload\s*=\s*!isOverload|!\s*isOverload/.test(script))
        return { ok: false, hint: 'Переключай состояние через isOverload = !isOverload.' };
      if (!/serverStatus\s*\.\s*textContent\s*=/.test(script))
        return { ok: false, hint: 'Обновляй текст через serverStatus.textContent = ...' };
      if (!/Перегрузка/.test(script) || !/Норма/.test(script))
        return { ok: false, hint: 'В коде должны использоваться оба статуса: «Перегрузка» и «Норма».' };
      return { ok: true };
    },
    reward: '🏅 JavaScript-модуль пройден! Артём: «Теперь ты реально управляешь интерфейсом.»',
    colleagueTips: [
      { npc: 'colleague2', lines: [
        'Саша. Переключение состояния — это булев флаг и отрицание.',
        'isOverload = !isOverload; затем меняем textContent.',
        'Сначала проверь, что обработчик click точно подключён.',
      ]},
      { npc: 'colleague1', lines: [
        'Маша! Используй тернарный оператор или обычный if/else.',
        'Пример: serverStatus.textContent = isOverload ? "Статус: Перегрузка" : "Статус: Норма";',
        'Это финальный паттерн для интерактивных UI-задач.',
      ]},
    ],
  },
];
