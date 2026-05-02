// ============================================================
// JAVASCRIPT TASKS
// ============================================================

import { getCleanScript } from '../core/task-check-utils.js';

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
      Пора запускать первый рабочий скрипт в «Кодликсе».
    `,
    introDialog: [
      'Дима, в интерфейсе есть кнопка "Закрыть задачу", но она ничего не меняет. Такой баг часто встречается в первых UI-скриптах.',
      'Нам нужно связать действие пользователя с изменением данных: по клику число выполненных задач должно увеличиваться.',
      'После обновления переменной интерфейс тоже должен обновиться, иначе пользователь не увидит результат.',
      'Разберись с теорией DOM и событий, затем подключи обработчик click и оживи счётчик.',
    ],
    brief: 'По клику на <code>doneBtn</code> увеличивай <code>done</code> и обновляй <code>counterEl.textContent</code> в формате «Закрыто задач: число».',
    theory: `
      <b>JavaScript делает страницу интерактивной</b><br><br>
      HTML создаёт элементы страницы, CSS оформляет их, а JavaScript добавляет поведение. Благодаря JS
      кнопка может реагировать на клик, счётчик может увеличиваться, текст на странице может меняться без
      перезагрузки.<br><br>

      <b>DOM: как JavaScript видит страницу</b><br>
      Браузер превращает HTML в DOM — дерево объектов страницы. Через JavaScript можно найти нужный
      элемент и изменить его. Например, элемент с <code>id="counter"</code> ищут так:<br>
      <pre><code>const counterEl = document.getElementById('counter');</code></pre>
      <code>const</code> означает, что переменная хранит ссылку на один и тот же элемент. Сам элемент при
      этом можно изменять: например, менять его текст.<br><br>

      <b>Событие click</b><br>
      Событие — это действие пользователя или браузера. Клик по кнопке — событие <code>click</code>.
      Чтобы выполнить код после клика, используют <code>addEventListener</code>:<br>
      <pre><code>doneBtn.addEventListener('click', () =&gt; {
  // код выполнится после клика
});</code></pre>

      <b>Счётчик хранится в переменной</b><br>
      Если нужно запоминать число закрытых задач, создают переменную:<br>
      <pre><code>let done = 0;</code></pre>
      <code>let</code> подходит для значения, которое будет меняться. Увеличить число на 1 можно коротко:
      <code>done++</code>.<br><br>

      <b>Обновление текста на странице</b><br>
      Свойство <code>textContent</code> меняет текст внутри элемента:<br>
      <pre><code>counterEl.textContent = 'Закрыто задач: ' + done;</code></pre>

      <b>Полная схема интерактива:</b> найти кнопку и текст → повесить обработчик клика → изменить
      переменную → записать новый текст на страницу.
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
      const script = getCleanScript(code);
      if (!/doneBtn\s*\.\s*addEventListener\s*\(\s*['"]click['"]/.test(script))
        return { ok: false, hint: 'Добавь обработчик клика: doneBtn.addEventListener("click", ...)' };
      if (!/done\s*(?:\+\+|=\s*done\s*\+\s*1|=\s*1\s*\+\s*done)/.test(script))
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
    introDialog: [
      'Дима, следующая задача про логику: система доступа в серверную должна принимать решение автоматически.',
      'Проход разрешается только когда выполняются сразу два условия: есть бейдж и уровень сотрудника не ниже второго.',
      'Если хотя бы одно условие не выполнено, доступ должен быть закрыт. Это классический кейс для if/else и логического И.',
      'Изучи блок про условия и затем запиши итог в переменную accessMessage.',
    ],
    brief: 'Проверь условие <code>hasBadge && level >= 2</code>: при true присвой <code>accessMessage = "Доступ разрешён"</code>, иначе — «Доступ запрещён».',
    theory: `
      <b>Условия помогают программе принимать решения</b><br><br>
      В реальной программе часто нужно выбрать один из вариантов: пускать пользователя или нет, показывать
      ошибку или успех, включать тёмную тему или светлую. Для этого используют конструкцию
      <code>if / else</code>.<br><br>

      <b>Схема if / else</b><br>
      <pre><code>if (условие) {
  // выполнится, если условие true
} else {
  // выполнится, если условие false
}</code></pre>
      Условие внутри круглых скобок должно давать логическое значение: <code>true</code> или
      <code>false</code>.<br><br>

      <b>Сравнение чисел</b><br>
      Оператор <code>&gt;=</code> означает «больше или равно». Например, <code>level &gt;= 2</code>
      истинно, если уровень равен 2, 3, 4 и так далее. Если <code>level</code> равен 1, условие ложно.<br><br>

      <b>Логическое И: &amp;&amp;</b><br>
      Иногда одного условия недостаточно. В задаче доступ разрешён только если есть бейдж
      <i>и</i> уровень не ниже 2. Для этого используют <code>&amp;&amp;</code>:<br>
      <pre><code>if (hasBadge &amp;&amp; level &gt;= 2) {
  accessMessage = 'Доступ разрешён';
} else {
  accessMessage = 'Доступ запрещён';
}</code></pre>
      <code>&amp;&amp;</code> возвращает true только тогда, когда обе части true. Если хотя бы одна часть
      false, весь доступ запрещается.<br><br>

      <b>Переменная результата</b><br>
      В этой задаче итоговое сообщение нужно записать в <code>accessMessage</code>. Это удобно: сначала
      программа принимает решение, потом результат можно вывести в консоль, показать на странице или
      отправить дальше.
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
      const script = getCleanScript(code);
      if (!/\bif\s*\(/.test(script))
        return { ok: false, hint: 'Добавь конструкцию if (...) { ... } else { ... }' };
      if (!/hasBadge\s*&&\s*level\s*>=\s*2|level\s*>=\s*2\s*&&\s*hasBadge/.test(script))
        return { ok: false, hint: 'В условии должны участвовать hasBadge и проверка level >= 2' };
      if (!/accessMessage\s*=/.test(script))
        return { ok: false, hint: 'Результат проверки нужно записать в accessMessage.' };
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
    introDialog: [
      'Дима, здесь задача на автоматизацию: вместо ручной нумерации тикетов нужно собрать отчёт программно.',
      'Список тикетов уже лежит в массиве, значит подойдёт цикл for с проходом по индексам.',
      'Важно не потерять строки, которые уже добавлены в отчёт, и правильно начать нумерацию с 1 для пользователя.',
      'Прочитай теорию по массивам и циклам, затем собери report из всех элементов tickets.',
    ],
    brief: 'Через цикл <code>for</code> пройди по <code>tickets</code> и добавляй в <code>report</code> строки вида <code>1. ...</code>, <code>2. ...</code> с нумерацией <code>i + 1</code>.',
    theory: `
      <b>Цикл повторяет действие автоматически</b><br><br>
      Если нужно обработать 5 тикетов, можно написать 5 почти одинаковых строк. Но если тикетов станет
      50, такой код быстро превратится в проблему. Цикл позволяет описать действие один раз и повторить
      его для каждого элемента.<br><br>

      <b>Массив — список значений</b><br>
      В задаче тикеты лежат в массиве:<br>
      <pre><code>const tickets = ['Баг кнопки', 'Верстка', 'Ошибка формы'];</code></pre>
      У каждого элемента есть номер — индекс. В JavaScript индексы начинаются с 0:
      <code>tickets[0]</code> — первый тикет, <code>tickets[1]</code> — второй.<br><br>

      <b>Цикл for</b><br>
      <pre><code>for (let i = 0; i &lt; tickets.length; i++) {
  // здесь работаем с tickets[i]
}</code></pre>
      <code>let i = 0</code> — начинаем с первого индекса;<br>
      <code>i &lt; tickets.length</code> — продолжаем, пока индекс меньше длины массива;<br>
      <code>i++</code> — после каждого шага увеличиваем индекс на 1.<br><br>

      <b>Почему используется tickets.length?</b><br>
      <code>tickets.length</code> — количество элементов в массиве. Если список станет длиннее или короче,
      цикл всё равно пройдёт ровно по всем тикетам. Это лучше, чем вручную писать число 5.<br><br>

      <b>Сборка строки отчёта</b><br>
      Чтобы не потерять предыдущие строки, используют <code>+=</code>:<br>
      <pre><code>report += 'новая строка';</code></pre>
      Номер для пользователя должен начинаться с 1, поэтому берут <code>i + 1</code>, хотя индекс массива
      начинается с 0.
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
      const script = getCleanScript(code);
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
    introDialog: [
      'Дима, когда один и тот же код копируют много раз, он быстро становится неудобным в поддержке.',
      'Здесь нужно вынести шаблон приветствия в функцию, которая принимает имя и роль и возвращает готовую строку.',
      'Так мы сможем вызывать один и тот же код для разных сотрудников без дублирования.',
      'Разберись с параметрами и return, затем создай makeGreeting(name, role) по формату задания.',
    ],
    brief: 'Создай функцию <code>makeGreeting(name, role)</code>, которая возвращает строку: «Привет, &lt;name&gt;! Ты назначен на роль: &lt;role&gt;.»',
    theory: `
      <b>Функция — команда, которую можно вызывать много раз</b><br><br>
      Если один и тот же кусок логики нужен в нескольких местах, его удобно оформить как функцию. Тогда
      код не копируется, а получает понятное имя. Например, функция приветствия может собирать текст для
      разных сотрудников.<br><br>

      <b>Объявление функции</b><br>
      <pre><code>function makeGreeting(name, role) {
  return 'Привет, ' + name + '!';
}</code></pre>
      <code>function</code> говорит, что мы создаём функцию;<br>
      <code>makeGreeting</code> — имя функции;<br>
      <code>name</code> и <code>role</code> — параметры, то есть данные, которые функция получает при
      вызове.<br><br>

      <b>Параметры — как входные данные</b><br>
      Одна и та же функция может работать с разными значениями:<br>
      <pre><code>makeGreeting('Маша', 'Frontend');
makeGreeting('Саша', 'Teamlead');</code></pre>
      В первом вызове <code>name</code> будет <code>'Маша'</code>, во втором — <code>'Саша'</code>.<br><br>

      <b>return возвращает результат</b><br>
      Если функция должна что-то посчитать или собрать строку, она возвращает результат через
      <code>return</code>. Без <code>return</code> снаружи получится <code>undefined</code> — специальное
      значение «результата нет».<br><br>

      <b>Склеивание строк</b><br>
      Строки можно соединять оператором <code>+</code>:<br>
      <pre><code>return 'Привет, ' + name + '! Ты назначен на роль: ' + role + '.';</code></pre>
      Так функция не привязана к одному человеку: имя и роль приходят через параметры.
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
      const script = getCleanScript(code);
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
    introDialog: [
      'Дима, теперь задача на структуру данных: нужно хранить информацию не одним числом, а объектами сотрудников.',
      'У каждого сотрудника должны быть имя, роль и количество закрытых задач, а все сотрудники собираются в массив team.',
      'После этого нужно посчитать общую сумму tasksDone по всей команде через цикл.',
      'Изучи блок про объекты и массивы, затем собери team из трёх сотрудников и вычисли totalDone.',
    ],
    brief: 'Создай массив <code>team</code> из 3 объектов с полями <code>name</code>, <code>role</code>, <code>tasksDone</code> и посчитай сумму в <code>totalDone</code>.',
    theory: `
      <b>Объекты описывают сущности, массивы хранят списки</b><br><br>
      В реальных приложениях данные редко бывают одиночными числами. Сотрудник — это не только имя:
      у него есть роль, количество выполненных задач и другие свойства. Для таких данных используют
      объекты.<br><br>

      <b>Объект</b><br>
      Объект хранит данные в формате «ключ: значение».<br>
      <pre><code>const user = {
  name: 'Маша',
  role: 'Frontend',
  tasksDone: 3
};</code></pre>
      <code>name</code>, <code>role</code>, <code>tasksDone</code> — свойства объекта. Получить значение
      свойства можно через точку: <code>user.tasksDone</code>.<br><br>

      <b>Массив объектов</b><br>
      Когда сотрудников несколько, их удобно хранить в массиве:<br>
      <pre><code>const team = [
  { name: 'Маша', role: 'Frontend', tasksDone: 3 },
  { name: 'Саша', role: 'Teamlead', tasksDone: 5 }
];</code></pre>
      <code>team[0]</code> — первый сотрудник, <code>team[1]</code> — второй. А
      <code>team[0].tasksDone</code> — количество задач первого сотрудника.<br><br>

      <b>Подсчёт суммы</b><br>
      Чтобы узнать общее количество закрытых задач, заводят переменную-счётчик и проходят по массиву
      циклом:<br>
      <pre><code>let totalDone = 0;

for (let i = 0; i &lt; team.length; i++) {
  totalDone += team[i].tasksDone;
}</code></pre>
      <code>totalDone += ...</code> означает: «прибавь к текущей сумме новое значение».<br><br>

      <b>Важно:</b> <code>tasksDone</code> должно быть числом, а не строкой. Числа складываются как числа,
      а строки могут склеиваться как текст.
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
      const script = getCleanScript(code);
      if (!/const\s+team\s*=\s*\[/.test(script))
        return { ok: false, hint: 'Создай массив team: const team = [ ... ];' };
      const tasksDoneMatches = script.match(/tasksDone\s*:/g) || [];
      if (tasksDoneMatches.length < 3)
        return { ok: false, hint: 'В массиве должно быть 3 объекта с полем tasksDone.' };
      if (!/\bfor\s*\(|forEach\s*\(/.test(script))
        return { ok: false, hint: 'Посчитай сумму через цикл for или forEach.' };
      if (!/totalDone\s*\+=\s*team\s*\[\s*\w+\s*\]\s*\.\s*tasksDone|totalDone\s*=\s*totalDone\s*\+\s*team\s*\[\s*\w+\s*\]\s*\.\s*tasksDone|totalDone\s*\+=\s*\w+\s*\.\s*tasksDone|totalDone\s*=\s*totalDone\s*\+\s*\w+\s*\.\s*tasksDone/.test(script))
        return { ok: false, hint: 'Добавляй tasksDone каждого сотрудника в totalDone.' };
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
    introDialog: [
      'Дима, это финальная JS-задача: нужно сделать рабочий переключатель состояния в интерфейсе.',
      'По нажатию кнопки статус должен меняться между нормой и перегрузкой, а текст на экране — сразу обновляться.',
      'Для этого нужен булев флаг, его переключение через оператор ! и запись нового текста в DOM.',
      'Пройди теорию и собери обработчик click так, чтобы пользователь видел корректный статус после каждого нажатия.',
    ],
    brief: 'По клику на <code>toggleBtn</code> переключай <code>isOverload = !isOverload</code> и обновляй <code>serverStatus.textContent</code> между «Статус: Норма» и «Статус: Перегрузка».',
    theory: `
      <b>Состояние интерфейса — это то, что программа должна помнить</b><br><br>
      У интерфейса часто есть состояние: меню открыто или закрыто, звук включён или выключен, сервер в
      норме или перегружен. Такое состояние удобно хранить в переменной.<br><br>

      <b>Булево значение</b><br>
      Для переключателей используют значения <code>true</code> и <code>false</code>. Они означают
      «истина» и «ложь». Например:<br>
      <pre><code>let isOverload = false;</code></pre>
      Здесь <code>false</code> означает, что перегрузки сейчас нет.<br><br>

      <b>Переключение через !</b><br>
      Оператор <code>!</code> означает «не». Если было <code>false</code>, станет <code>true</code>.
      Если было <code>true</code>, станет <code>false</code>.<br>
      <pre><code>isOverload = !isOverload;</code></pre>
      Это короткая и часто используемая схема для кнопок-переключателей.<br><br>

      <b>DOM и обработчик клика</b><br>
      Сначала нужно найти элементы страницы:<br>
      <pre><code>const serverStatus = document.getElementById('serverStatus');
const toggleBtn = document.getElementById('toggleBtn');</code></pre>
      Затем подписаться на клик по кнопке:<br>
      <pre><code>toggleBtn.addEventListener('click', () =&gt; {
  isOverload = !isOverload;
});</code></pre>

      <b>Выбор текста по состоянию</b><br>
      После переключения нужно показать пользователю новый статус. Можно использовать обычный
      <code>if / else</code> или тернарный оператор:<br>
      <pre><code>serverStatus.textContent = isOverload
  ? 'Статус: Перегрузка'
  : 'Статус: Норма';</code></pre>
      Тернарный оператор читается так: если <code>isOverload</code> true — взять первый текст, иначе —
      второй. Это компактная форма простого выбора.
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
      const script = getCleanScript(code);
      if (!/toggleBtn\s*\.\s*addEventListener\s*\(\s*['"]click['"]/.test(script))
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
