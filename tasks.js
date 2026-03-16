// ============================================================
// УЧЕБНЫЕ СЦЕНАРИИ: HTML / CSS / JS
// ============================================================

export const TASKS = [

  // ══════════════════════════════════════════════════════════
  // МОДУЛЬ 1: HTML — 5 заданий
  // ══════════════════════════════════════════════════════════

  // ── HTML ЗАДАНИЕ 1: Теги и структура ──────────────────────
  {
    id: 'html-1-tags',
    module: 'html',
    moduleIndex: 1,
    title: 'HTML: Первый день — сломанная страница',
    npc: 'boss',
    context: `
      🗂️ <b>Первый рабочий день в «Шмякдексе».</b><br><br>
      Тимлид Артём встречает тебя у входа с кислой миной:<br>
      <i>«Дима, хорошо что пришёл. Предыдущий стажёр сломал страницу приветствия для новых сотрудников.
      Теги везде перепутаны — браузер рендерит какую-то кашу. Почини до обеда, пожалуйста.»</i><br><br>
      Ты садишься за компьютер. Пора разобраться с HTML.
    `,
    theory: `
      <b>Что такое HTML и теги?</b><br><br>
      HTML (HyperText Markup Language) — это язык разметки, на котором написаны все веб-страницы.
      Он описывает <i>структуру</i> страницы: что является заголовком, что — абзацем, что — ссылкой.<br><br>

      Основная единица HTML — это <b>тег</b>. Большинство тегов парные: есть открывающий и закрывающий:<br>
      <pre><code>&lt;тег&gt;содержимое&lt;/тег&gt;</code></pre>
      Закрывающий тег отличается слэшем <code>/</code> перед именем.<br><br>

      <b>Самые важные теги:</b><br>
      <pre><code>&lt;h1&gt;Главный заголовок&lt;/h1&gt;
&lt;h2&gt;Заголовок поменьше&lt;/h2&gt;
&lt;p&gt;Обычный абзац текста&lt;/p&gt;
&lt;b&gt;Жирный текст&lt;/b&gt;
&lt;i&gt;Курсивный текст&lt;/i&gt;</code></pre>

      <b>Важное правило:</b> теги должны быть правильно вложены. Нельзя открыть &lt;b&gt;, потом открыть &lt;i&gt;,
      а закрыть сначала &lt;b&gt;. Это как матрёшки — внутренняя закрывается раньше внешней.<br><br>

      ✅ Правильно: <code>&lt;b&gt;&lt;i&gt;текст&lt;/i&gt;&lt;/b&gt;</code><br>
      ❌ Неправильно: <code>&lt;b&gt;&lt;i&gt;текст&lt;/b&gt;&lt;/i&gt;</code>
    `,
    description: `
      ✏️ <b>Задание:</b> Исправь страницу приветствия.<br><br>
      В коде три ошибки: у некоторых тегов пропущен закрывающий слэш <code>/</code>.
      Найди и исправь все три тега — <code>&lt;h1&gt;</code>, <code>&lt;p&gt;</code> и <code>&lt;b&gt;</code>.
    `,
    starterCode: `<h1>Добро пожаловать в Шмякдекс!<h1>
<p>Мы рады видеть тебя в нашей команде.<p>
<p>Здесь ты будешь <b>создавать крутые сайты<b> каждый день.</p>`,
    check(code) {
      const d = document.createElement('div');
      d.innerHTML = code;
      const h1 = d.querySelector('h1');
      const ps = d.querySelectorAll('p');
      const b = d.querySelector('b');
      if (!h1 || !h1.textContent.trim())
        return { ok: false, hint: 'Тег &lt;h1&gt; не закрыт. Добавь &lt;/h1&gt; в конце заголовка.' };
      if (ps.length < 2)
        return { ok: false, hint: 'Один из тегов &lt;p&gt; не закрыт. Добавь &lt;/p&gt; в конце абзаца.' };
      if (!b || !b.textContent.trim())
        return { ok: false, hint: 'Тег &lt;b&gt; не закрыт. Добавь &lt;/b&gt; после выделенного текста.' };
      return { ok: true };
    },
    reward: '🏅 Первый баг исправлен! Артём кивает с одобрением.',
    colleagueTips: [
      { npc: 'colleague1', lines: [
        'Привет, я Маша! Добро пожаловать в команду.',
        'Смотри, закрывающий тег — это как крышка: &lt;h1&gt; открыл, &lt;/h1&gt; закрыл. Слэш — главное отличие.',
        'Пройдись по каждому тегу и проверь: есть ли у него пара с &lt;/...&gt;?',
      ]},
      { npc: 'colleague2', lines: [
        'Саша. Коротко: ищи теги без слэша в конце — это и есть баги.',
        'Например &lt;h1&gt;Текст&lt;h1&gt; — второй тег должен быть &lt;/h1&gt;.',
        'Три тега сломаны: h1, один из p, и b. Найди их и добавь слэш.',
      ]},
    ],
  },

  // ── HTML ЗАДАНИЕ 2: Атрибуты ──────────────────────────────
  {
    id: 'html-2-attributes',
    module: 'html',
    moduleIndex: 2,
    title: 'HTML: Ссылки и атрибуты',
    npc: 'boss',
    context: `
      🔗 <b>Артём снова у твоего стола:</b><br><br>
      <i>«Дима, на странице "О компании" есть ссылки на соцсети, но они никуда не ведут.
      Кто-то забыл прописать адреса. И ещё — картинка не отображается, у неё нет пути к файлу.
      Разберись, пожалуйста.»</i><br><br>
      Ты открываешь файл и видишь пустые атрибуты. Время разобраться, что такое атрибуты в HTML.
    `,
    theory: `
      <b>Атрибуты HTML-тегов</b><br><br>
      Атрибуты — это дополнительные параметры тега, которые уточняют его поведение или внешний вид.
      Они пишутся <i>внутри открывающего тега</i> в формате <code>имя="значение"</code>:<br>
      <pre><code>&lt;тег атрибут="значение"&gt;содержимое&lt;/тег&gt;</code></pre>

      <b>Тег &lt;a&gt; — ссылка:</b><br>
      Атрибут <code>href</code> задаёт адрес, куда ведёт ссылка:<br>
      <pre><code>&lt;a href="https://example.com"&gt;Перейти&lt;/a&gt;</code></pre>
      Атрибут <code>target="_blank"</code> открывает ссылку в новой вкладке.<br><br>

      <b>Тег &lt;img&gt; — картинка:</b><br>
      Это одиночный тег (без закрывающего). Атрибут <code>src</code> — путь к файлу,
      <code>alt</code> — текст, если картинка не загрузилась:<br>
      <pre><code>&lt;img src="photo.jpg" alt="Фото офиса"&gt;</code></pre>

      <b>Тег &lt;input&gt; — поле ввода:</b><br>
      Атрибут <code>type</code> определяет тип поля: <code>text</code>, <code>email</code>, <code>password</code>:<br>
      <pre><code>&lt;input type="email" placeholder="Введи email"&gt;</code></pre>
    `,
    description: `
      ✏️ <b>Задание:</b> Исправь страницу «О компании».<br><br>
      1. Добавь атрибут <code>href="https://shmyakdex.ru"</code> в тег <code>&lt;a&gt;</code>.<br>
      2. Добавь атрибут <code>src="logo.png"</code> и <code>alt="Логотип Шмякдекс"</code> в тег <code>&lt;img&gt;</code>.
    `,
    starterCode: `<h2>О компании Шмякдекс</h2>
<p>Мы делаем интернет лучше с 2010 года.</p>
<a>Наш сайт</a>
<img>`,
    check(code) {
      const d = document.createElement('div');
      d.innerHTML = code;
      const a = d.querySelector('a');
      const img = d.querySelector('img');
      if (!a) return { ok: false, hint: 'Тег &lt;a&gt; не найден.' };
      if (!a.getAttribute('href') || !a.getAttribute('href').startsWith('http'))
        return { ok: false, hint: 'Добавь атрибут href со ссылкой, например: href="https://shmyakdex.ru"' };
      if (!img) return { ok: false, hint: 'Тег &lt;img&gt; не найден.' };
      if (!img.getAttribute('src'))
        return { ok: false, hint: 'Добавь атрибут src к тегу &lt;img&gt;, например: src="logo.png"' };
      if (!img.getAttribute('alt'))
        return { ok: false, hint: 'Добавь атрибут alt к тегу &lt;img&gt; — это важно для доступности!' };
      return { ok: true };
    },
    reward: '🏅 Атрибуты освоены! Ссылки заработали.',
    colleagueTips: [
      { npc: 'colleague1', lines: [
        'Маша здесь! Атрибуты — это как настройки тега.',
        'Для ссылки: &lt;a href="адрес"&gt;текст&lt;/a&gt;. Без href ссылка никуда не ведёт.',
        'Для картинки: &lt;img src="файл.jpg" alt="описание"&gt;. Оба атрибута обязательны!',
      ]},
      { npc: 'colleague2', lines: [
        'Саша. Атрибуты пишутся внутри открывающего тега через пробел.',
        'href для ссылок, src для картинок — запомни эти два, они нужны постоянно.',
        'alt у картинки — не просто формальность, это важно для людей с нарушением зрения.',
      ]},
    ],
  },

  // ── HTML ЗАДАНИЕ 3: Списки ────────────────────────────────
  {
    id: 'html-3-lists',
    module: 'html',
    moduleIndex: 3,
    title: 'HTML: Список задач команды',
    npc: 'colleague1',
    context: `
      📋 <b>Маша подходит к тебе с ноутбуком:</b><br><br>
      <i>«Дима, я делаю страницу с задачами нашей команды на спринт.
      Написала текст, но он выглядит как сплошная каша — всё в одну строку.
      Помоги оформить это нормальными списками? Артём хочет видеть маркированный список задач
      и нумерованный список приоритетов.»</i><br><br>
      Ты берёшься за дело.
    `,
    theory: `
      <b>Списки в HTML</b><br><br>
      HTML умеет делать два вида списков:<br><br>

      <b>1. Маркированный список</b> (с точками) — тег <code>&lt;ul&gt;</code> (unordered list):<br>
      <pre><code>&lt;ul&gt;
  &lt;li&gt;Первый пункт&lt;/li&gt;
  &lt;li&gt;Второй пункт&lt;/li&gt;
  &lt;li&gt;Третий пункт&lt;/li&gt;
&lt;/ul&gt;</code></pre>

      <b>2. Нумерованный список</b> (1, 2, 3...) — тег <code>&lt;ol&gt;</code> (ordered list):<br>
      <pre><code>&lt;ol&gt;
  &lt;li&gt;Сначала это&lt;/li&gt;
  &lt;li&gt;Потом это&lt;/li&gt;
  &lt;li&gt;И наконец это&lt;/li&gt;
&lt;/ol&gt;</code></pre>

      В обоих случаях каждый пункт — это тег <code>&lt;li&gt;</code> (list item).<br><br>

      <b>Когда что использовать?</b><br>
      — <code>&lt;ul&gt;</code> — когда порядок не важен (список покупок, список функций).<br>
      — <code>&lt;ol&gt;</code> — когда порядок важен (инструкция, рейтинг, шаги алгоритма).
    `,
    description: `
      ✏️ <b>Задание:</b> Оформи страницу задач команды.<br><br>
      1. Создай <b>маркированный список</b> <code>&lt;ul&gt;</code> с тремя задачами:<br>
      &nbsp;&nbsp;— «Починить баги на главной»<br>
      &nbsp;&nbsp;— «Обновить дизайн кнопок»<br>
      &nbsp;&nbsp;— «Написать документацию»<br><br>
      2. Создай <b>нумерованный список</b> <code>&lt;ol&gt;</code> с двумя приоритетами:<br>
      &nbsp;&nbsp;— «Критические баги»<br>
      &nbsp;&nbsp;— «Новые фичи»
    `,
    starterCode: `<h2>Задачи на спринт</h2>

<!-- Сделай маркированный список задач -->

<h2>Приоритеты</h2>

<!-- Сделай нумерованный список приоритетов -->
`,
    check(code) {
      const d = document.createElement('div');
      d.innerHTML = code;
      const ul = d.querySelector('ul');
      const ol = d.querySelector('ol');
      const liInUl = ul ? ul.querySelectorAll('li') : [];
      const liInOl = ol ? ol.querySelectorAll('li') : [];
      if (!ul) return { ok: false, hint: 'Создай маркированный список: &lt;ul&gt;...&lt;/ul&gt;' };
      if (liInUl.length < 3) return { ok: false, hint: `В маркированном списке должно быть 3 пункта &lt;li&gt;. Сейчас: ${liInUl.length}.` };
      if (!ol) return { ok: false, hint: 'Создай нумерованный список: &lt;ol&gt;...&lt;/ol&gt;' };
      if (liInOl.length < 2) return { ok: false, hint: `В нумерованном списке должно быть 2 пункта &lt;li&gt;. Сейчас: ${liInOl.length}.` };
      return { ok: true };
    },
    reward: '🏅 Списки освоены! Маша довольна — страница выглядит аккуратно.',
    colleagueTips: [
      { npc: 'colleague1', lines: [
        'Маша здесь! Это моё задание, так что объясню.',
        'ul — это неупорядоченный список (unordered), ol — упорядоченный (ordered). Внутри обоих — теги li.',
        'Структура: &lt;ul&gt;&lt;li&gt;пункт&lt;/li&gt;&lt;li&gt;пункт&lt;/li&gt;&lt;/ul&gt;',
      ]},
      { npc: 'colleague2', lines: [
        'Саша. Запомни: ul = маркеры, ol = цифры, li = один пункт.',
        'Не забудь закрыть каждый &lt;li&gt; и сам список &lt;/ul&gt; или &lt;/ol&gt;.',
        'Пункты должны быть ВНУТРИ тега ul или ol, не снаружи.',
      ]},
    ],
  },

  // ── HTML ЗАДАНИЕ 4: Таблицы ───────────────────────────────
  {
    id: 'html-4-tables',
    module: 'html',
    moduleIndex: 4,
    title: 'HTML: Таблица сотрудников',
    npc: 'colleague2',
    context: `
      📊 <b>Саша перехватывает тебя у кофемашины:</b><br><br>
      <i>«О, Дима! Слушай, мне нужна помощь. Артём попросил сделать таблицу сотрудников
      для внутреннего портала — имя, отдел, email. Я начал, но запутался в тегах таблицы.
      Можешь доделать? Там осталось добавить строки с данными.»</i><br><br>
      Саша показывает незаконченный код. Ты берёшь задачу.
    `,
    theory: `
      <b>Таблицы в HTML</b><br><br>
      Таблица — это сетка из строк и ячеек. В HTML она строится из нескольких тегов:<br><br>

      <code>&lt;table&gt;</code> — сама таблица (контейнер)<br>
      <code>&lt;tr&gt;</code> — строка таблицы (table row)<br>
      <code>&lt;th&gt;</code> — заголовочная ячейка (table header), текст жирный<br>
      <code>&lt;td&gt;</code> — обычная ячейка с данными (table data)<br><br>

      <b>Пример простой таблицы:</b><br>
      <pre><code>&lt;table&gt;
  &lt;tr&gt;
    &lt;th&gt;Имя&lt;/th&gt;
    &lt;th&gt;Возраст&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Анна&lt;/td&gt;
    &lt;td&gt;25&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Борис&lt;/td&gt;
    &lt;td&gt;30&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</code></pre>

      <b>Логика вложенности:</b> table → tr → th/td. Ячейки всегда внутри строк, строки — внутри таблицы.
    `,
    description: `
      ✏️ <b>Задание:</b> Добавь в таблицу две строки с данными сотрудников.<br><br>
      Заголовки уже есть. Добавь две строки <code>&lt;tr&gt;</code> с тремя ячейками <code>&lt;td&gt;</code> в каждой:<br><br>
      Строка 1: «Иван Петров», «Разработка», «ivan@shmyakdex.ru»<br>
      Строка 2: «Анна Смирнова», «Дизайн», «anna@shmyakdex.ru»
    `,
    starterCode: `<table>
  <tr>
    <th>Имя</th>
    <th>Отдел</th>
    <th>Email</th>
  </tr>
  <!-- добавь строки с данными здесь -->

</table>`,
    check(code) {
      const d = document.createElement('div');
      d.innerHTML = code;
      const table = d.querySelector('table');
      if (!table) return { ok: false, hint: 'Тег &lt;table&gt; не найден.' };
      const rows = table.querySelectorAll('tr');
      if (rows.length < 3) return { ok: false, hint: `Нужно минимум 3 строки (1 заголовок + 2 данных). Сейчас: ${rows.length}.` };
      const dataCells = table.querySelectorAll('td');
      if (dataCells.length < 6) return { ok: false, hint: `Нужно 6 ячеек &lt;td&gt; (2 строки × 3 столбца). Сейчас: ${dataCells.length}.` };
      const hasEmpty = Array.from(dataCells).some(td => !td.textContent.trim());
      if (hasEmpty) return { ok: false, hint: 'Все ячейки &lt;td&gt; должны содержать текст.' };
      return { ok: true };
    },
    reward: '🏅 Таблицы освоены! Саша говорит: «Огонь, спасибо!»',
    colleagueTips: [
      { npc: 'colleague2', lines: [
        'Саша здесь! Это моя задача, объясню.',
        'Каждая строка — это &lt;tr&gt;. Внутри строки — ячейки &lt;td&gt;. Три столбца = три &lt;td&gt; в каждой строке.',
        'Структура: &lt;tr&gt;&lt;td&gt;Иван&lt;/td&gt;&lt;td&gt;Разработка&lt;/td&gt;&lt;td&gt;email&lt;/td&gt;&lt;/tr&gt;',
      ]},
      { npc: 'colleague1', lines: [
        'Маша! Таблицы — это tr для строк и td для ячеек.',
        'Не путай th и td: th — заголовок (жирный), td — обычные данные.',
        'Добавь две строки tr, в каждой по три td с нужными данными.',
      ]},
    ],
  },

  // ── HTML ЗАДАНИЕ 5: Форма ─────────────────────────────────
  {
    id: 'html-5-forms',
    module: 'html',
    moduleIndex: 5,
    title: 'HTML: Форма обратной связи',
    npc: 'boss',
    context: `
      📝 <b>Артём вызывает тебя на серьёзный разговор:</b><br><br>
      <i>«Дима, ты хорошо справляешься. Даю тебе первое самостоятельное задание.
      Нам нужна форма обратной связи на сайте — поле для имени, поле для email,
      текстовое поле для сообщения и кнопка отправки.
      Это базовая вещь, которую должен уметь каждый фронтендер. Справишься?»</i><br><br>
      Ты уверенно киваешь. Пора применить всё, что узнал об HTML.
    `,
    theory: `
      <b>Формы в HTML</b><br><br>
      Форма — это способ получить данные от пользователя. Всё, что внутри тега <code>&lt;form&gt;</code>,
      является частью формы.<br><br>

      <b>Основные элементы формы:</b><br><br>

      <code>&lt;input type="text"&gt;</code> — однострочное поле для текста<br>
      <code>&lt;input type="email"&gt;</code> — поле для email (браузер проверяет формат)<br>
      <code>&lt;textarea&gt;</code> — многострочное поле для длинного текста<br>
      <code>&lt;button type="submit"&gt;</code> — кнопка отправки формы<br><br>

      <b>Атрибут placeholder</b> — подсказка внутри поля (исчезает при вводе):<br>
      <pre><code>&lt;input type="text" placeholder="Введи своё имя"&gt;</code></pre>

      <b>Тег &lt;label&gt;</b> — подпись к полю. Связывается с полем через атрибут <code>for</code>
      и <code>id</code> у поля:<br>
      <pre><code>&lt;label for="name"&gt;Имя:&lt;/label&gt;
&lt;input type="text" id="name"&gt;</code></pre>

      <b>Пример полной формы:</b><br>
      <pre><code>&lt;form&gt;
  &lt;label for="email"&gt;Email:&lt;/label&gt;
  &lt;input type="email" id="email" placeholder="your@mail.ru"&gt;
  &lt;textarea placeholder="Ваше сообщение"&gt;&lt;/textarea&gt;
  &lt;button type="submit"&gt;Отправить&lt;/button&gt;
&lt;/form&gt;</code></pre>
    `,
    description: `
      ✏️ <b>Задание:</b> Создай форму обратной связи с нуля.<br><br>
      Форма должна содержать:<br>
      1. Тег <code>&lt;form&gt;</code> как контейнер<br>
      2. <code>&lt;input type="text"&gt;</code> — поле для имени<br>
      3. <code>&lt;input type="email"&gt;</code> — поле для email<br>
      4. <code>&lt;textarea&gt;</code> — поле для сообщения<br>
      5. <code>&lt;button type="submit"&gt;</code> — кнопку с текстом «Отправить»
    `,
    starterCode: `<!-- Создай форму обратной связи здесь -->
`,
    check(code) {
      const d = document.createElement('div');
      d.innerHTML = code;
      const form = d.querySelector('form');
      if (!form) return { ok: false, hint: 'Оберни всё в тег &lt;form&gt;...&lt;/form&gt;.' };
      const inputText = form.querySelector('input[type="text"]');
      if (!inputText) return { ok: false, hint: 'Добавь &lt;input type="text"&gt; для имени.' };
      const inputEmail = form.querySelector('input[type="email"]');
      if (!inputEmail) return { ok: false, hint: 'Добавь &lt;input type="email"&gt; для email.' };
      const textarea = form.querySelector('textarea');
      if (!textarea) return { ok: false, hint: 'Добавь &lt;textarea&gt;&lt;/textarea&gt; для сообщения.' };
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return { ok: false, hint: 'Добавь &lt;button type="submit"&gt;Отправить&lt;/button&gt;.' };
      if (!btn.textContent.trim()) return { ok: false, hint: 'Кнопка должна содержать текст, например «Отправить».' };
      return { ok: true };
    },
    reward: '🏅 Формы освоены! Артём жмёт руку: «Добро пожаловать в команду, джун!»',
    colleagueTips: [
      { npc: 'colleague1', lines: [
        'Маша! Формы — это несложно, главное не забыть обернуть всё в &lt;form&gt;.',
        'Для имени: &lt;input type="text"&gt;, для email: &lt;input type="email"&gt;.',
        'Textarea — это отдельный тег, не input! И не забудь кнопку &lt;button type="submit"&gt;.',
      ]},
      { npc: 'colleague2', lines: [
        'Саша. Пять элементов: form, input text, input email, textarea, button submit.',
        'Все поля должны быть ВНУТРИ тега form.',
        'Кнопка: &lt;button type="submit"&gt;Отправить&lt;/button&gt; — не забудь текст внутри.',
      ]},
    ],
  },

  // ── HTML ЗАДАНИЕ 6: div, span, class, id ──────────────────
  {
    id: 'html-6-divspan',
    module: 'html',
    moduleIndex: 6,
    title: 'HTML: Блоки и классы',
    npc: 'colleague1',
    context: `
      🧩 <b>Маша зовёт тебя к своему монитору:</b><br><br>
      <i>«Дима, смотри — я делаю карточки новостей для корпоративного портала.
      Мне нужно сгруппировать элементы в блоки, чтобы потом стилизовать их через CSS.
      Ты знаешь про div и span? Помоги собрать структуру карточки.»</i><br><br>
      Это важный момент — именно div и span являются основой любой современной вёрстки.
    `,
    theory: `
      <b>div и span — универсальные контейнеры</b><br><br>

      <code>&lt;div&gt;</code> — <b>блочный</b> контейнер. Занимает всю ширину строки, начинается с новой строки.
      Используется для группировки крупных блоков страницы:<br>
      <pre><code>&lt;div&gt;
  &lt;h2&gt;Заголовок блока&lt;/h2&gt;
  &lt;p&gt;Текст внутри блока&lt;/p&gt;
&lt;/div&gt;</code></pre>

      <code>&lt;span&gt;</code> — <b>строчный</b> контейнер. Не переносит на новую строку, используется
      для выделения части текста:<br>
      <pre><code>&lt;p&gt;Цена: &lt;span&gt;990 ₽&lt;/span&gt;&lt;/p&gt;</code></pre>

      <b>Атрибуты class и id</b><br><br>

      <code>class</code> — имя класса для стилизации через CSS. Один класс можно использовать у многих элементов:<br>
      <pre><code>&lt;div class="card"&gt;...&lt;/div&gt;
&lt;div class="card"&gt;...&lt;/div&gt;</code></pre>

      <code>id</code> — уникальный идентификатор. Должен встречаться на странице только один раз:<br>
      <pre><code>&lt;div id="header"&gt;...&lt;/div&gt;</code></pre>

      У одного элемента может быть несколько классов через пробел:<br>
      <pre><code>&lt;div class="card card-featured"&gt;...&lt;/div&gt;</code></pre>
    `,
    description: `
      ✏️ <b>Задание:</b> Собери карточку новости для корпоративного портала.<br><br>
      Создай <code>&lt;div&gt;</code> с классом <code>card</code>, внутри которого:<br>
      1. <code>&lt;h3&gt;</code> с любым заголовком новости<br>
      2. <code>&lt;p&gt;</code> с текстом новости, где дата обёрнута в <code>&lt;span&gt;</code> с классом <code>date</code><br>
      3. <code>&lt;a&gt;</code> с атрибутом <code>href</code> и текстом «Читать далее»
    `,
    starterCode: `<!-- Собери карточку новости -->
`,
    check(code) {
      const d = document.createElement('div');
      d.innerHTML = code;
      const card = d.querySelector('div.card');
      if (!card) return { ok: false, hint: 'Создай &lt;div class="card"&gt;...&lt;/div&gt; как контейнер карточки.' };
      const h3 = card.querySelector('h3');
      if (!h3 || !h3.textContent.trim()) return { ok: false, hint: 'Внутри карточки добавь &lt;h3&gt; с заголовком новости.' };
      const p = card.querySelector('p');
      if (!p) return { ok: false, hint: 'Добавь &lt;p&gt; с текстом новости внутри карточки.' };
      const span = card.querySelector('span.date');
      if (!span) return { ok: false, hint: 'Оберни дату в &lt;span class="date"&gt;...&lt;/span&gt; внутри параграфа.' };
      const a = card.querySelector('a[href]');
      if (!a) return { ok: false, hint: 'Добавь &lt;a href="..."&gt;Читать далее&lt;/a&gt; внутри карточки.' };
      return { ok: true };
    },
    reward: '🏅 div и span освоены! Маша: «Теперь я смогу стилизовать это через CSS!»',
    colleagueTips: [
      { npc: 'colleague1', lines: [
        'Маша здесь! div — это коробка для блоков, span — для кусочка текста.',
        'class пишется так: &lt;div class="card"&gt;. Потом в CSS можно написать .card { ... }.',
        'Структура: div.card → h3, p (внутри p — span.date), a[href].',
      ]},
      { npc: 'colleague2', lines: [
        'Саша. div — блочный, span — строчный. Запомни это раз и навсегда.',
        'class="card" — это имя класса. Точка перед именем в CSS: .card { color: red; }.',
        'span.date — это span с классом date. Он должен быть ВНУТРИ тега p.',
      ]},
    ],
  },

  // ── HTML ЗАДАНИЕ 7: Семантика HTML5 ───────────────────────
  {
    id: 'html-7-semantic',
    module: 'html',
    moduleIndex: 7,
    title: 'HTML: Семантическая разметка',
    npc: 'boss',
    context: `
      🏗️ <b>Артём собирает команду на код-ревью:</b><br><br>
      <i>«Ребята, я смотрел вёрстку нашего нового лендинга — там везде одни div'ы.
      Это непрофессионально. Поисковики и скринридеры не понимают структуру страницы.
      Дима, переверстай шапку и подвал с использованием семантических тегов HTML5.
      Это важно для SEO и доступности.»</i><br><br>
      Ты открываешь файл. Пора познакомиться с семантикой.
    `,
    theory: `
      <b>Семантические теги HTML5</b><br><br>

      Семантика — это смысл. Семантические теги говорят браузеру и поисковику,
      <i>что именно</i> находится в этом блоке, а не просто «какой-то блок».<br><br>

      <b>Основные семантические теги:</b><br><br>

      <code>&lt;header&gt;</code> — шапка страницы или секции (логотип, навигация)<br>
      <code>&lt;nav&gt;</code> — блок навигации (меню со ссылками)<br>
      <code>&lt;main&gt;</code> — основное содержимое страницы (только один на странице)<br>
      <code>&lt;section&gt;</code> — тематическая секция с заголовком<br>
      <code>&lt;article&gt;</code> — самостоятельный материал (статья, пост, новость)<br>
      <code>&lt;aside&gt;</code> — боковая панель, дополнительный контент<br>
      <code>&lt;footer&gt;</code> — подвал страницы (копирайт, контакты)<br><br>

      <b>Сравнение:</b><br>
      <pre><code>❌ Без семантики:
&lt;div id="header"&gt;
  &lt;div id="nav"&gt;...&lt;/div&gt;
&lt;/div&gt;

✅ С семантикой:
&lt;header&gt;
  &lt;nav&gt;...&lt;/nav&gt;
&lt;/header&gt;</code></pre>

      Визуально страница выглядит одинаково, но семантика помогает поисковикам,
      скринридерам для незрячих и другим разработчикам понять структуру.
    `,
    description: `
      ✏️ <b>Задание:</b> Переверстай страницу лендинга с семантическими тегами.<br><br>
      Замени все <code>&lt;div&gt;</code> на подходящие семантические теги:<br>
      1. Внешний блок с логотипом → <code>&lt;header&gt;</code><br>
      2. Блок с меню-ссылками → <code>&lt;nav&gt;</code><br>
      3. Блок с основным контентом → <code>&lt;main&gt;</code><br>
      4. Нижний блок с копирайтом → <code>&lt;footer&gt;</code>
    `,
    starterCode: `<div>
  <h1>Шмякдекс</h1>
  <div>
    <a href="#">Главная</a>
    <a href="#">О нас</a>
    <a href="#">Контакты</a>
  </div>
</div>

<div>
  <h2>Лучший поиск в рунете</h2>
  <p>Мы индексируем миллиарды страниц каждый день.</p>
</div>

<div>
  <p>© 2024 Шмякдекс. Все права защищены.</p>
</div>`,
    check(code) {
      const d = document.createElement('div');
      d.innerHTML = code;
      const header = d.querySelector('header');
      if (!header) return { ok: false, hint: 'Замени внешний &lt;div&gt; с логотипом на &lt;header&gt;.' };
      const nav = d.querySelector('nav');
      if (!nav) return { ok: false, hint: 'Замени блок с ссылками-меню на &lt;nav&gt;.' };
      const navLinks = nav.querySelectorAll('a');
      if (navLinks.length < 2) return { ok: false, hint: 'Внутри &lt;nav&gt; должны быть ссылки &lt;a&gt;.' };
      const main = d.querySelector('main');
      if (!main) return { ok: false, hint: 'Замени блок с основным контентом на &lt;main&gt;.' };
      const footer = d.querySelector('footer');
      if (!footer) return { ok: false, hint: 'Замени нижний блок с копирайтом на &lt;footer&gt;.' };
      return { ok: true };
    },
    reward: '🏅 Семантика освоена! Артём: «Вот теперь это профессиональная вёрстка.»',
    colleagueTips: [
      { npc: 'colleague2', lines: [
        'Саша. Семантика — это просто замена div на более говорящие теги.',
        'header — шапка, nav — навигация, main — главный контент, footer — подвал.',
        'Просто замени каждый &lt;div&gt; на нужный тег. Атрибуты и содержимое не трогай.',
      ]},
      { npc: 'colleague1', lines: [
        'Маша! Семантические теги — это как подписи на коробках. Сразу понятно что внутри.',
        'Блок с логотипом и меню → header. Меню со ссылками → nav. Основной текст → main. Копирайт → footer.',
        'Просто замени открывающий и закрывающий &lt;div&gt; на нужный тег.',
      ]},
    ],
  },

  // ── HTML ЗАДАНИЕ 8: Структура HTML-документа ──────────────
  {
    id: 'html-8-document',
    module: 'html',
    moduleIndex: 8,
    title: 'HTML: Скелет страницы',
    npc: 'boss',
    context: `
      📄 <b>Пятница. Артём ставит финальное задание недели:</b><br><br>
      <i>«Дима, ты уже умеешь писать отдельные HTML-элементы. Но настоящая страница —
      это не просто набор тегов. У неё есть чёткая структура: DOCTYPE, head, body.
      Создай с нуля полноценный HTML-документ для новой страницы нашего сайта.
      Без этого ни один браузер не поймёт твой код правильно.»</i><br><br>
      Это финальное задание HTML-модуля. Собери всё воедино.
    `,
    theory: `
      <b>Структура HTML-документа</b><br><br>

      Каждая HTML-страница должна начинаться с определённой структуры.
      Вот минимальный корректный документ:<br>
      <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="ru"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Название страницы&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Привет, мир!&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>

      <b>Разбор по частям:</b><br><br>

      <code>&lt;!DOCTYPE html&gt;</code> — объявление типа документа. Говорит браузеру:
      «это современный HTML5». Всегда первая строка.<br><br>

      <code>&lt;html lang="ru"&gt;</code> — корневой тег, оборачивает всю страницу.
      Атрибут <code>lang</code> указывает язык — важно для поисковиков и скринридеров.<br><br>

      <code>&lt;head&gt;</code> — служебная секция. Содержимое не отображается на странице,
      но влияет на её работу: кодировка, заголовок вкладки, подключение CSS.<br><br>

      <code>&lt;meta charset="UTF-8"&gt;</code> — кодировка. Без неё кириллица превратится в кракозябры.<br><br>

      <code>&lt;title&gt;</code> — текст в заголовке вкладки браузера и в результатах поиска.<br><br>

      <code>&lt;body&gt;</code> — всё видимое содержимое страницы: текст, картинки, кнопки.
    `,
    description: `
      ✏️ <b>Задание:</b> Создай полноценный HTML-документ для страницы «Вакансии Шмякдекса».<br><br>
      Документ должен содержать:<br>
      1. <code>&lt;!DOCTYPE html&gt;</code><br>
      2. <code>&lt;html&gt;</code> с атрибутом <code>lang</code><br>
      3. <code>&lt;head&gt;</code> с <code>&lt;meta charset="UTF-8"&gt;</code> и <code>&lt;title&gt;</code><br>
      4. <code>&lt;body&gt;</code> с заголовком <code>&lt;h1&gt;</code> и хотя бы одним <code>&lt;p&gt;</code>
    `,
    starterCode: `<!-- Создай полноценный HTML-документ здесь -->
`,
    check(code) {
      const hasDoctype = /<!DOCTYPE\s+html>/i.test(code);
      if (!hasDoctype) return { ok: false, hint: 'Добавь &lt;!DOCTYPE html&gt; самой первой строкой.' };
      const hasHtmlLang = /<html[^>]+lang\s*=/i.test(code);
      if (!hasHtmlLang) return { ok: false, hint: 'Тег &lt;html&gt; должен иметь атрибут lang, например: &lt;html lang="ru"&gt;.' };
      const hasCharset = /charset\s*=\s*["']?UTF-8["']?/i.test(code);
      if (!hasCharset) return { ok: false, hint: 'Добавь в &lt;head&gt; тег &lt;meta charset="UTF-8"&gt;.' };
      const hasTitle = /<title>[^<]+<\/title>/i.test(code);
      if (!hasTitle) return { ok: false, hint: 'Добавь &lt;title&gt;Название страницы&lt;/title&gt; внутри &lt;head&gt;.' };
      const hasBody = /<body[\s>]/i.test(code);
      if (!hasBody) return { ok: false, hint: 'Добавь тег &lt;body&gt;...&lt;/body&gt; с содержимым страницы.' };
      const hasH1 = /<h1>[^<]+<\/h1>/i.test(code);
      if (!hasH1) return { ok: false, hint: 'Внутри &lt;body&gt; добавь &lt;h1&gt; с заголовком страницы.' };
      const hasP = /<p>[^<]+<\/p>/i.test(code);
      if (!hasP) return { ok: false, hint: 'Добавь хотя бы один &lt;p&gt; с текстом внутри &lt;body&gt;.' };
      return { ok: true };
    },
    reward: '🏅 HTML-модуль полностью пройден! Артём: «Теперь ты знаешь HTML как настоящий фронтендер. Следующий шаг — CSS!»',
    colleagueTips: [
      { npc: 'colleague1', lines: [
        'Маша! Структура документа — это как скелет. Без него всё рассыпается.',
        'Порядок: DOCTYPE → html[lang] → head[charset + title] → body[h1 + p].',
        'Не забудь lang="ru" у тега html и charset="UTF-8" у meta!',
      ]},
      { npc: 'colleague2', lines: [
        'Саша. Запомни шаблон раз и навсегда: DOCTYPE, html[lang], head[charset+title], body[контент].',
        'Без DOCTYPE браузер включает "режим совместимости" — страница может сломаться.',
        'Скопируй структуру из теории и заполни title, h1 и p своим текстом.',
      ]},
    ],
  },

  // ══════════════════════════════════════════════════════════
  // МОДУЛЬ 2: CSS — 7 заданий
  // ══════════════════════════════════════════════════════════

  // ── CSS ЗАДАНИЕ 1: Синтаксис, селекторы, цвета ────────────
  {
    id: 'css-1-syntax',
    module: 'css',
    moduleIndex: 1,
    title: 'CSS: Первые стили',
    npc: 'colleague1',
    context: `
      🎨 <b>Понедельник. Маша подходит к тебе с кружкой кофе:</b><br><br>
      <i>«Дима, привет! Ты уже неплохо знаешь HTML. Но посмотри на нашу страницу —
      она выглядит как документ из 1995 года. Чёрный текст, белый фон, синие ссылки.
      Пора добавить стили! Я покажу тебе основы CSS — это моя любимая тема.»</i><br><br>
      Маша открывает редактор. Начинается CSS-модуль.
    `,
    theory: `
      <b>Что такое CSS?</b><br><br>

      CSS (Cascading Style Sheets — каскадные таблицы стилей) — это язык, который описывает
      <i>внешний вид</i> HTML-элементов. HTML отвечает за структуру, CSS — за красоту.<br><br>

      <b>Синтаксис CSS:</b><br>
      <pre><code>селектор {
  свойство: значение;
  свойство: значение;
}</code></pre>

      <b>Селектор</b> — указывает, к каким элементам применить стили.<br>
      <b>Свойство</b> — что именно меняем (цвет, размер, отступ).<br>
      <b>Значение</b> — на что меняем.<br><br>

      <b>Три вида селекторов:</b><br><br>

      По тегу — применяется ко всем элементам этого тега:<br>
      <pre><code>p {
  color: navy;
}</code></pre>

      По классу — применяется к элементам с этим классом (точка перед именем):<br>
      <pre><code>.title {
  color: red;
}</code></pre>

      По id — применяется к одному конкретному элементу (решётка перед именем):<br>
      <pre><code>#logo {
  color: green;
}</code></pre>

      <b>Цвета в CSS:</b><br>
      — Именованные: <code>red</code>, <code>blue</code>, <code>white</code>, <code>black</code>, <code>orange</code><br>
      — HEX-код: <code>#ff0000</code> (красный), <code>#3b82f6</code> (синий)<br>
      — RGB: <code>rgb(255, 0, 0)</code> — красный через три канала (красный, зелёный, синий)
    `,
    description: `
      ✏️ <b>Задание:</b> Оживи страницу «О компании» первыми стилями.<br><br>
      В блоке <code>&lt;style&gt;</code> напиши CSS:<br>
      1. Для тега <code>h1</code> задай <code>color</code> любого цвета (не чёрный)<br>
      2. Для класса <code>.subtitle</code> задай <code>color</code> любого цвета<br>
      3. Для тега <code>p</code> задай <code>font-size: 16px</code>
    `,
    starterCode: `<!-- HTML (не меняй) -->
<h1>О компании Шмякдекс</h1>
<p class="subtitle">Делаем интернет лучше с 2010 года</p>
<p>Наша команда — 500 крутых специалистов со всей страны.</p>
<p>Мы верим, что технологии меняют мир к лучшему.</p>

<style>
  /* Напиши стили здесь */

</style>`,
    check(code) {
      const hasH1Color = /h1\s*\{[^}]*color\s*:[^;]+;/i.test(code);
      if (!hasH1Color) return { ok: false, hint: 'Добавь стиль для h1: h1 { color: значение; }' };

      const subtitleColor = /\.subtitle\s*\{[^}]*color\s*:[^;]+;/i.test(code);
      if (!subtitleColor) return { ok: false, hint: 'Добавь стиль для класса .subtitle: .subtitle { color: значение; }' };

      const pFontSize = /p\s*\{[^}]*font-size\s*:\s*16px/i.test(code);
      if (!pFontSize) return { ok: false, hint: 'Добавь для тега p: p { font-size: 16px; }' };

      return { ok: true };
    },
    reward: '🏅 Первые стили написаны! Маша: «Уже лучше! Теперь это не выглядит как Word-документ.»',
    colleagueTips: [
      { npc: 'colleague1', lines: [
        'Маша здесь! CSS — это моя стихия.',
        'Для тега: h1 { color: red; }. Для класса: .subtitle { color: blue; }. Точка перед именем класса — обязательна!',
        'Цвет можно написать словом (red, navy, coral) или кодом (#ff6600). Попробуй оба варианта!',
      ]},
      { npc: 'colleague2', lines: [
        'Саша. Три правила: h1 { color: ... }, .subtitle { color: ... }, p { font-size: 16px; }.',
        'Не забывай точку с запятой после каждого значения и фигурные скобки вокруг свойств.',
        'font-size: 16px — именно 16px, без пробела между числом и единицей измерения.',
      ]},
    ],
  },

  // ── CSS ЗАДАНИЕ 2: Блочная модель (box model) ─────────────
  {
    id: 'css-2-boxmodel',
    module: 'css',
    moduleIndex: 2,
    title: 'CSS: Отступы и рамки',
    npc: 'colleague1',
    context: `
      📦 <b>Маша показывает тебе макет в Figma:</b><br><br>
      <i>«Смотри, Дима — в макете карточка сотрудника красивая: есть воздух вокруг текста,
      рамка, скруглённые углы. А в браузере всё слиплось в кучу.
      Это потому что ты не знаешь про блочную модель CSS. Давай разберёмся!»</i><br><br>
      Маша рисует на листочке квадрат в квадрате в квадрате. Это и есть box model.
    `,
    theory: `
      <b>Блочная модель CSS (Box Model)</b><br><br>

      Каждый HTML-элемент — это прямоугольная коробка. Она состоит из четырёх слоёв,
      как матрёшка снаружи внутрь:<br><br>

      <b>1. margin</b> — внешний отступ. Пространство <i>снаружи</i> элемента, между ним и соседями.<br>
      <b>2. border</b> — рамка вокруг элемента.<br>
      <b>3. padding</b> — внутренний отступ. Пространство <i>внутри</i> элемента, между рамкой и содержимым.<br>
      <b>4. content</b> — само содержимое (текст, картинка).<br><br>

      <pre><code>┌─────────────── margin ───────────────┐
│  ┌──────────── border ─────────────┐  │
│  │  ┌───────── padding ──────────┐ │  │
│  │  │        content             │ │  │
│  │  └────────────────────────────┘ │  │
│  └─────────────────────────────────┘  │
└───────────────────────────────────────┘</code></pre>

      <b>Синтаксис:</b><br>
      <pre><code>/* Одно значение — все стороны одинаково */
padding: 16px;

/* Два значения — вертикаль | горизонталь */
padding: 10px 20px;

/* Четыре значения — верх | право | низ | лево */
margin: 10px 20px 10px 20px;</code></pre>

      <b>Рамка (border):</b><br>
      <pre><code>border: 2px solid #3b82f6;
/* толщина | стиль | цвет */
/* стили: solid (сплошная), dashed (пунктир), dotted (точки) */</code></pre>

      <b>Скругление углов:</b><br>
      <pre><code>border-radius: 8px;   /* все углы */
border-radius: 50%;   /* круг (если ширина = высота) */</code></pre>

      <b>Ширина и высота:</b><br>
      <pre><code>width: 300px;
height: 200px;</code></pre>
    `,
    description: `
      ✏️ <b>Задание:</b> Оформи карточку сотрудника по макету.<br><br>
      Для класса <code>.card</code> задай:<br>
      1. <code>padding: 20px</code> — внутренний отступ<br>
      2. <code>margin: 16px</code> — внешний отступ<br>
      3. <code>border</code> любого цвета, стиль <code>solid</code>, толщина от 1px до 3px<br>
      4. <code>border-radius: 12px</code> — скруглённые углы<br>
      5. <code>width: 280px</code> — ширина карточки
    `,
    starterCode: `<!-- HTML (не меняй) -->
<div class="card">
  <h3>Иван Петров</h3>
  <p>Должность: Разработчик</p>
  <p>Отдел: Фронтенд</p>
</div>

<style>
  body { font-family: system-ui, sans-serif; }

  .card {
    /* Напиши стили здесь */

  }
</style>`,
    check(code) {
      const block = code.match(/\.card\s*\{([^}]*)\}/s);
      if (!block) return { ok: false, hint: 'Найди блок .card { } и пиши стили внутри него.' };
      const props = block[1];

      if (!/padding\s*:/.test(props))
        return { ok: false, hint: 'Добавь padding: 20px; внутри .card { }' };
      if (!/margin\s*:/.test(props))
        return { ok: false, hint: 'Добавь margin: 16px; внутри .card { }' };
      if (!/border\s*:/.test(props))
        return { ok: false, hint: 'Добавь border, например: border: 2px solid #3b82f6;' };
      if (!/border-radius\s*:/.test(props))
        return { ok: false, hint: 'Добавь border-radius: 12px; для скруглённых углов.' };
      if (!/width\s*:/.test(props))
        return { ok: false, hint: 'Добавь width: 280px; чтобы задать ширину карточки.' };

      return { ok: true };
    },
    reward: '🏅 Box model освоен! Маша: «Теперь карточка выглядит как в макете!»',
    colleagueTips: [
      { npc: 'colleague1', lines: [
        'Маша! padding — это воздух внутри, margin — снаружи. Запомни раз и навсегда.',
        'border пишется тремя значениями через пробел: толщина стиль цвет. Например: 2px solid blue.',
        'Все пять свойств должны быть внутри .card { }. Проверь фигурные скобки!',
      ]},
      { npc: 'colleague2', lines: [
        'Саша. box model — это padding (внутри), border (рамка), margin (снаружи).',
        'border: 1px solid #ccc; — минимальная рамка. Можешь поменять цвет на любой.',
        'border-radius: 12px — скругляет все четыре угла. Чем больше значение, тем круглее.',
      ]},
    ],
  },

  // ── CSS ЗАДАНИЕ 3: Типографика ────────────────────────────
  {
    id: 'css-3-typography',
    module: 'css',
    moduleIndex: 3,
    title: 'CSS: Типографика',
    npc: 'colleague1',
    context: `
      🔤 <b>Маша возвращается после обеда с распечаткой:</b><br><br>
      <i>«Дима, смотри — дизайнер прислал требования к тексту для корпоративного блога.
      Заголовок должен быть крупным и жирным, подзаголовок — поменьше и курсивом,
      основной текст — с нормальным межстрочным интервалом, чтобы читать было удобно.
      Можешь настроить типографику через CSS?»</i><br><br>
      Ты берёшь распечатку. Пора разобраться с текстовыми свойствами CSS.
    `,
    theory: `
      <b>Типографика в CSS</b><br><br>

      Типографика — это всё, что касается оформления текста. CSS даёт мощные инструменты
      для управления шрифтами и текстом.<br><br>

      <b>Размер и начертание шрифта:</b><br>
      <pre><code>font-size: 24px;        /* размер шрифта */
font-weight: bold;      /* жирный (или число: 400, 700, 900) */
font-style: italic;     /* курсив */
font-family: Arial, sans-serif; /* гарнитура шрифта */</code></pre>

      <b>Межстрочный интервал и выравнивание:</b><br>
      <pre><code>line-height: 1.6;       /* межстрочный интервал (1.5–1.8 — комфортно для чтения) */
text-align: center;     /* выравнивание: left | center | right | justify */
letter-spacing: 2px;    /* межбуквенный интервал */
text-transform: uppercase; /* регистр: uppercase | lowercase | capitalize */</code></pre>

      <b>Оформление текста:</b><br>
      <pre><code>text-decoration: underline;    /* подчёркивание */
text-decoration: none;         /* убрать подчёркивание (у ссылок) */
text-decoration: line-through; /* зачёркивание */</code></pre>

      <b>Единицы измерения для шрифтов:</b><br>
      — <code>px</code> — пиксели, фиксированный размер<br>
      — <code>em</code> — относительно размера шрифта родителя (1em = текущий размер)<br>
      — <code>rem</code> — относительно корневого размера страницы (обычно 16px)
    `,
    description: `
      ✏️ <b>Задание:</b> Настрой типографику для корпоративного блога.<br><br>
      1. Для <code>h1</code>: размер <code>32px</code>, жирный (<code>font-weight: bold</code>), выравнивание по центру<br>
      2. Для <code>.lead</code>: курсив (<code>font-style: italic</code>), цвет <code>#555</code> или любой серый<br>
      3. Для <code>p</code>: межстрочный интервал <code>line-height: 1.7</code>
    `,
    starterCode: `<!-- HTML (не меняй) -->
<h1>Корпоративный блог Шмякдекса</h1>
<p class="lead">Истории о технологиях, людях и коде</p>
<p>Добро пожаловать в наш блог! Здесь мы рассказываем о том,
как создаём продукты, которыми пользуются миллионы людей каждый день.</p>
<p>Наши инженеры делятся опытом, дизайнеры — вдохновением,
а менеджеры — историями о том, как не сойти с ума в дедлайн.</p>

<style>
  body { font-family: system-ui, sans-serif; padding: 20px; }

  h1 {
    /* Напиши стили для заголовка */

  }

  .lead {
    /* Напиши стили для подзаголовка */

  }

  p {
    /* Напиши стили для абзацев */

  }
</style>`,
    check(code) {
      const h1Block = code.match(/h1\s*\{([^}]*)\}/s);
      const leadBlock = code.match(/\.lead\s*\{([^}]*)\}/s);
      const pBlock = code.match(/(?<![.#\w])p\s*\{([^}]*)\}/s);

      if (!h1Block) return { ok: false, hint: 'Найди блок h1 { } и добавь стили внутри.' };
      if (!/font-size\s*:\s*32px/i.test(h1Block[1]))
        return { ok: false, hint: 'Для h1 задай font-size: 32px;' };
      if (!/font-weight\s*:\s*bold/i.test(h1Block[1]))
        return { ok: false, hint: 'Для h1 задай font-weight: bold;' };
      if (!/text-align\s*:\s*center/i.test(h1Block[1]))
        return { ok: false, hint: 'Для h1 задай text-align: center;' };

      if (!leadBlock) return { ok: false, hint: 'Найди блок .lead { } и добавь стили.' };
      if (!/font-style\s*:\s*italic/i.test(leadBlock[1]))
        return { ok: false, hint: 'Для .lead задай font-style: italic;' };
      if (!/color\s*:/i.test(leadBlock[1]))
        return { ok: false, hint: 'Для .lead задай color: #555; (или любой серый цвет).' };

      if (!pBlock) return { ok: false, hint: 'Найди блок p { } и добавь стили.' };
      if (!/line-height\s*:\s*1\.7/i.test(pBlock[1]))
        return { ok: false, hint: 'Для p задай line-height: 1.7;' };

      return { ok: true };
    },
    reward: '🏅 Типографика освоена! Маша: «Теперь это приятно читать. Дизайнер будет доволен!»',
    colleagueTips: [
      { npc: 'colleague1', lines: [
        'Маша! Три блока: h1 { }, .lead { }, p { }. В каждый — свои свойства.',
        'font-size: 32px; font-weight: bold; text-align: center; — всё для h1.',
        'line-height: 1.7 — без единицы измерения! Это множитель, не пиксели.',
      ]},
      { npc: 'colleague2', lines: [
        'Саша. font-size — размер, font-weight — жирность, font-style — курсив, line-height — интервал.',
        'text-align: center — выравнивание по центру. Работает только для блочных элементов.',
        'Для .lead нужны font-style: italic и color. Любой серый: #555, #666, #888, gray.',
      ]},
    ],
  },

  // ── CSS ЗАДАНИЕ 4: Фон и цвета ────────────────────────────
  {
    id: 'css-4-backgrounds',
    module: 'css',
    moduleIndex: 4,
    title: 'CSS: Фон и цвета',
    npc: 'colleague1',
    context: `
      🖼️ <b>Маша тащит тебя смотреть на новый дизайн главной страницы:</b><br><br>
      <i>«Дима, смотри какой крутой макет прислал дизайнер! Тёмный фон у шапки,
      градиент у баннера, цветные карточки. Но в коде пока всё белое и скучное.
      Давай добавим фоны — это сразу преобразит страницу!»</i><br><br>
      Ты смотришь на макет. Пора разобраться с фонами в CSS.
    `,
    theory: `
      <b>Фон в CSS</b><br><br>

      CSS позволяет задавать фон несколькими способами.<br><br>

      <b>Цвет фона:</b><br>
      <pre><code>background-color: #1a2a3a;   /* тёмно-синий */
background-color: white;
background-color: rgb(255, 200, 100);</code></pre>

      <b>Градиент</b> — плавный переход между цветами:<br>
      <pre><code>/* Линейный градиент: направление, цвет1, цвет2 */
background: linear-gradient(to right, #3b82f6, #8b5cf6);
background: linear-gradient(135deg, #ff6b6b, #feca57);</code></pre>

      <b>Прозрачность через rgba:</b><br>
      <pre><code>/* rgba(красный, зелёный, синий, прозрачность 0–1) */
background-color: rgba(0, 0, 0, 0.5);  /* чёрный 50% */
background-color: rgba(59, 130, 246, 0.2); /* синий 20% */</code></pre>

      <b>Цвет текста на тёмном фоне:</b><br>
      Если фон тёмный — текст должен быть светлым, иначе ничего не видно:<br>
      <pre><code>.dark-block {
  background-color: #1a2a3a;
  color: white;  /* обязательно! */
}</code></pre>

      <b>opacity</b> — прозрачность всего элемента (0 = невидимый, 1 = непрозрачный):<br>
      <pre><code>opacity: 0.8;  /* элемент на 80% непрозрачен */</code></pre>
    `,
    description: `
      ✏️ <b>Задание:</b> Оформи шапку и баннер главной страницы Шмякдекса.<br><br>
      1. Для <code>.header</code>: тёмный <code>background-color</code> (любой тёмный) и <code>color: white</code><br>
      2. Для <code>.banner</code>: градиент через <code>background: linear-gradient(...)</code> с двумя любыми цветами<br>
      3. Для <code>.banner</code> также задай <code>color: white</code> и <code>padding: 40px</code>
    `,
    starterCode: `<!-- HTML (не меняй) -->
<div class="header">
  <h1>Шмякдекс</h1>
  <p>Лучший поиск в рунете</p>
</div>

<div class="banner">
  <h2>Найди всё что угодно</h2>
  <p>Миллиарды страниц проиндексированы для тебя</p>
</div>

<style>
  body { font-family: system-ui, sans-serif; margin: 0; }

  .header {
    padding: 20px 40px;
    /* Добавь тёмный фон и белый текст */

  }

  .banner {
    /* Добавь градиент, белый текст и padding: 40px */

  }
</style>`,
    check(code) {
      const headerBlock = code.match(/\.header\s*\{([^}]*)\}/s);
      const bannerBlock = code.match(/\.banner\s*\{([^}]*)\}/s);

      if (!headerBlock) return { ok: false, hint: 'Найди блок .header { } и добавь стили.' };
      if (!/background(-color)?\s*:/i.test(headerBlock[1]))
        return { ok: false, hint: 'Для .header добавь background-color с тёмным цветом.' };
      if (!/color\s*:\s*(white|#fff|#ffffff)/i.test(headerBlock[1]))
        return { ok: false, hint: 'Для .header добавь color: white; чтобы текст был виден на тёмном фоне.' };

      if (!bannerBlock) return { ok: false, hint: 'Найди блок .banner { } и добавь стили.' };
      if (!/linear-gradient/i.test(bannerBlock[1]))
        return { ok: false, hint: 'Для .banner добавь градиент: background: linear-gradient(135deg, #цвет1, #цвет2);' };
      if (!/color\s*:\s*(white|#fff|#ffffff)/i.test(bannerBlock[1]))
        return { ok: false, hint: 'Для .banner добавь color: white;' };
      if (!/padding\s*:\s*40px/i.test(bannerBlock[1]))
        return { ok: false, hint: 'Для .banner добавь padding: 40px;' };

      return { ok: true };
    },
    reward: '🏅 Фоны освоены! Маша: «Вот теперь это похоже на настоящий сайт!»',
    colleagueTips: [
      { npc: 'colleague1', lines: [
        'Маша! Тёмный фон — это любой тёмный цвет: #1a1a2e, #2d3748, #111827, navy...',
        'Градиент: background: linear-gradient(135deg, #ff6b6b, #feca57); — два цвета через запятую.',
        'Не забудь color: white для обоих блоков — иначе текст не будет виден!',
      ]},
      { npc: 'colleague2', lines: [
        'Саша. background-color для сплошного цвета, background: linear-gradient() для градиента.',
        'Градиент: первый аргумент — угол (135deg) или направление (to right), потом цвета.',
        'Пример: background: linear-gradient(to bottom, #3b82f6, #1e40af);',
      ]},
    ],
  },

  // ── CSS ЗАДАНИЕ 5: Flexbox ────────────────────────────────
  {
    id: 'css-5-flexbox',
    module: 'css',
    moduleIndex: 5,
    title: 'CSS: Flexbox — гибкая раскладка',
    npc: 'colleague1',
    context: `
      📐 <b>Маша в панике прибегает к твоему столу:</b><br><br>
      <i>«Дима, катастрофа! Карточки на странице команды стоят в столбик одна под другой,
      а должны быть в ряд! И кнопка в шапке никак не хочет прижаться вправо.
      Артём смотрит макет и недоволен. Ты знаешь Flexbox? Это единственное спасение!»</i><br><br>
      Ты слышал это слово раньше. Пора наконец разобраться.
    `,
    theory: `
      <b>Flexbox — гибкая система раскладки</b><br><br>

      Flexbox (Flexible Box) — это способ расположить элементы в строку или столбец
      и управлять их выравниванием. Это самый популярный инструмент вёрстки в современном вебе.<br><br>

      <b>Включение Flexbox:</b><br>
      Достаточно написать одно свойство у <i>родительского</i> элемента:<br>
      <pre><code>.container {
  display: flex;
}</code></pre>
      После этого все прямые дочерние элементы выстраиваются в ряд.<br><br>

      <b>Направление:</b><br>
      <pre><code>flex-direction: row;     /* в строку (по умолчанию) */
flex-direction: column;  /* в столбец */</code></pre>

      <b>Выравнивание по главной оси (горизонталь при row):</b><br>
      <pre><code>justify-content: flex-start;   /* прижать к началу */
justify-content: flex-end;     /* прижать к концу */
justify-content: center;       /* по центру */
justify-content: space-between; /* равные промежутки между */
justify-content: space-around;  /* равные промежутки вокруг */</code></pre>

      <b>Выравнивание по поперечной оси (вертикаль при row):</b><br>
      <pre><code>align-items: flex-start;  /* по верхнему краю */
align-items: center;      /* по центру вертикально */
align-items: flex-end;    /* по нижнему краю */
align-items: stretch;     /* растянуть (по умолчанию) */</code></pre>

      <b>Перенос элементов:</b><br>
      <pre><code>flex-wrap: wrap;    /* переносить на новую строку если не влезают */
flex-wrap: nowrap;  /* не переносить (по умолчанию) */</code></pre>

      <b>Промежутки между элементами:</b><br>
      <pre><code>gap: 16px;  /* отступ между всеми элементами */</code></pre>
    `,
    description: `
      ✏️ <b>Задание:</b> Исправь раскладку страницы команды с помощью Flexbox.<br><br>
      1. Для <code>.nav</code>: включи flex, выравнивание <code>justify-content: space-between</code> и <code>align-items: center</code><br>
      2. Для <code>.cards</code>: включи flex, добавь <code>flex-wrap: wrap</code> и <code>gap: 20px</code><br>
      3. Для <code>.card</code>: задай <code>width: 200px</code>
    `,
    starterCode: `<!-- HTML (не меняй) -->
<nav class="nav">
  <span class="logo">Шмякдекс</span>
  <button>Войти</button>
</nav>

<div class="cards">
  <div class="card">
    <h3>Иван</h3>
    <p>Разработчик</p>
  </div>
  <div class="card">
    <h3>Маша</h3>
    <p>Дизайнер</p>
  </div>
  <div class="card">
    <h3>Саша</h3>
    <p>Тимлид</p>
  </div>
</div>

<style>
  body { font-family: system-ui, sans-serif; margin: 0; padding: 20px; }

  .nav {
    background: #1e293b;
    color: white;
    padding: 12px 24px;
    /* Добавь flex-свойства */

  }

  .cards {
    margin-top: 20px;
    /* Добавь flex-свойства */

  }

  .card {
    background: #f1f5f9;
    padding: 16px;
    border-radius: 8px;
    /* Задай ширину */

  }
</style>`,
    check(code) {
      const navBlock = code.match(/\.nav\s*\{([^}]*)\}/s);
      const cardsBlock = code.match(/\.cards\s*\{([^}]*)\}/s);
      const cardBlock = code.match(/\.card\s*\{([^}]*)\}/s);

      if (!navBlock) return { ok: false, hint: 'Найди блок .nav { } и добавь flex-свойства.' };
      if (!/display\s*:\s*flex/i.test(navBlock[1]))
        return { ok: false, hint: 'Для .nav добавь display: flex;' };
      if (!/justify-content\s*:\s*space-between/i.test(navBlock[1]))
        return { ok: false, hint: 'Для .nav добавь justify-content: space-between;' };
      if (!/align-items\s*:\s*center/i.test(navBlock[1]))
        return { ok: false, hint: 'Для .nav добавь align-items: center;' };

      if (!cardsBlock) return { ok: false, hint: 'Найди блок .cards { } и добавь flex-свойства.' };
      if (!/display\s*:\s*flex/i.test(cardsBlock[1]))
        return { ok: false, hint: 'Для .cards добавь display: flex;' };
      if (!/flex-wrap\s*:\s*wrap/i.test(cardsBlock[1]))
        return { ok: false, hint: 'Для .cards добавь flex-wrap: wrap;' };
      if (!/gap\s*:\s*20px/i.test(cardsBlock[1]))
        return { ok: false, hint: 'Для .cards добавь gap: 20px;' };

      if (!cardBlock) return { ok: false, hint: 'Найди блок .card { } и задай ширину.' };
      if (!/width\s*:\s*200px/i.test(cardBlock[1]))
        return { ok: false, hint: 'Для .card добавь width: 200px;' };

      return { ok: true };
    },
    reward: '🏅 Flexbox освоен! Маша: «Ура! Карточки встали в ряд. Артём доволен!»',
    colleagueTips: [
      { npc: 'colleague1', lines: [
        'Маша! Flexbox включается одной строкой: display: flex; у родителя.',
        'justify-content управляет горизонталью, align-items — вертикалью.',
        'space-between — элементы по краям, промежутки между ними равные. Очень удобно для навбара!',
      ]},
      { npc: 'colleague2', lines: [
        'Саша. display: flex — включает. flex-wrap: wrap — разрешает перенос. gap — отступы между элементами.',
        'Для .nav нужно: display flex, justify-content space-between, align-items center.',
        'Для .cards: display flex, flex-wrap wrap, gap 20px. Для .card: width 200px.',
      ]},
    ],
  },

  // ── CSS ЗАДАНИЕ 6: Псевдоклассы и переходы ────────────────
  {
    id: 'css-6-hover',
    module: 'css',
    moduleIndex: 6,
    title: 'CSS: Hover и анимации',
    npc: 'colleague1',
    context: `
      ✨ <b>Маша смотрит на кнопки и морщится:</b><br><br>
      <i>«Дима, кнопки на сайте мёртвые — никак не реагируют на наведение мыши.
      Пользователь даже не понимает, что это кнопка, а не просто текст.
      Нужно добавить hover-эффекты и плавные переходы. Это делает интерфейс живым!»</i><br><br>
      Ты вспоминаешь, как на крутых сайтах кнопки плавно меняют цвет при наведении.
      Пора научиться делать то же самое.
    `,
    theory: `
      <b>Псевдоклассы CSS</b><br><br>

      Псевдокласс — это особое состояние элемента. Он пишется через двоеточие после селектора:<br>
      <pre><code>селектор:псевдокласс {
  свойство: значение;
}</code></pre>

      <b>Самые важные псевдоклассы:</b><br><br>

      <code>:hover</code> — когда пользователь наводит мышь на элемент:<br>
      <pre><code>.btn:hover {
  background-color: #1d4ed8;
}</code></pre>

      <code>:active</code> — в момент нажатия:<br>
      <pre><code>.btn:active {
  transform: scale(0.97);
}</code></pre>

      <code>:focus</code> — когда элемент в фокусе (например, поле ввода):<br>
      <pre><code>input:focus {
  border-color: #3b82f6;
  outline: none;
}</code></pre>

      <b>Плавные переходы — transition:</b><br>
      Без transition изменения происходят мгновенно. С ним — плавно:<br>
      <pre><code>.btn {
  background-color: #3b82f6;
  transition: background-color 0.3s ease;
  /* свойство | длительность | функция */
}

.btn:hover {
  background-color: #1d4ed8;
}</code></pre>

      Можно анимировать несколько свойств сразу:<br>
      <pre><code>transition: all 0.3s ease;</code></pre>

      <b>Трансформации:</b><br>
      <pre><code>transform: scale(1.05);      /* увеличить на 5% */
transform: translateY(-4px); /* сдвинуть вверх на 4px */
transform: rotate(45deg);    /* повернуть */</code></pre>
    `,
    description: `
      ✏️ <b>Задание:</b> Добавь интерактивность кнопкам и карточкам.<br><br>
      1. Для <code>.btn</code>: добавь <code>transition: all 0.3s ease</code> и <code>cursor: pointer</code><br>
      2. Для <code>.btn:hover</code>: измени <code>background-color</code> на более тёмный оттенок<br>
      3. Для <code>.card:hover</code>: добавь <code>transform: translateY(-4px)</code> и <code>box-shadow</code>
    `,
    starterCode: `<!-- HTML (не меняй) -->
<button class="btn">Отправить заявку</button>
<button class="btn">Узнать больше</button>

<div class="card">
  <h3>Вакансия: Frontend-разработчик</h3>
  <p>Удалённо · от 80 000 ₽</p>
</div>

<style>
  body { font-family: system-ui, sans-serif; padding: 20px; }

  .btn {
    background-color: #3b82f6;
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 8px;
    font-size: 15px;
    margin: 8px;
    /* Добавь transition и cursor */

  }

  .btn:hover {
    /* Измени цвет фона */

  }

  .card {
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px;
    margin-top: 20px;
    width: 300px;
    /* Добавь transition */

  }

  .card:hover {
    /* Добавь transform и box-shadow */

  }
</style>`,
    check(code) {
      const btnBlock = code.match(/\.btn\s*\{([^}]*)\}/s);
      const btnHoverBlock = code.match(/\.btn\s*:\s*hover\s*\{([^}]*)\}/s);
      const cardHoverBlock = code.match(/\.card\s*:\s*hover\s*\{([^}]*)\}/s);

      if (!btnBlock) return { ok: false, hint: 'Найди блок .btn { } и добавь свойства.' };
      if (!/transition\s*:/i.test(btnBlock[1]))
        return { ok: false, hint: 'Для .btn добавь transition: all 0.3s ease;' };
      if (!/cursor\s*:\s*pointer/i.test(btnBlock[1]))
        return { ok: false, hint: 'Для .btn добавь cursor: pointer;' };

      if (!btnHoverBlock) return { ok: false, hint: 'Добавь блок .btn:hover { } с изменением цвета фона.' };
      if (!/background(-color)?\s*:/i.test(btnHoverBlock[1]))
        return { ok: false, hint: 'В .btn:hover измени background-color на более тёмный.' };

      if (!cardHoverBlock) return { ok: false, hint: 'Добавь блок .card:hover { } с эффектами.' };
      if (!/transform\s*:\s*translateY/i.test(cardHoverBlock[1]))
        return { ok: false, hint: 'В .card:hover добавь transform: translateY(-4px);' };
      if (!/box-shadow\s*:/i.test(cardHoverBlock[1]))
        return { ok: false, hint: 'В .card:hover добавь box-shadow, например: box-shadow: 0 8px 24px rgba(0,0,0,0.12);' };

      return { ok: true };
    },
    reward: '🏅 Hover-эффекты освоены! Маша: «Теперь интерфейс живой. Пользователи это почувствуют!»',
    colleagueTips: [
      { npc: 'colleague1', lines: [
        'Маша! :hover — это состояние при наведении. Пишется через двоеточие: .btn:hover { }.',
        'transition ставится на ОСНОВНОЙ элемент, не на :hover. Тогда переход будет плавным в обе стороны.',
        'box-shadow: 0 8px 24px rgba(0,0,0,0.12); — красивая тень. Попробуй!',
      ]},
      { npc: 'colleague2', lines: [
        'Саша. transition: all 0.3s ease — анимирует все изменяемые свойства за 0.3 секунды.',
        'translateY(-4px) — сдвигает карточку на 4 пикселя вверх. Минус — это вверх!',
        'Не забудь cursor: pointer — без него кнопка не показывает руку при наведении.',
      ]},
    ],
  },

  // ── CSS ЗАДАНИЕ 7: Позиционирование ──────────────────────
  {
    id: 'css-7-position',
    module: 'css',
    moduleIndex: 7,
    title: 'CSS: Позиционирование',
    npc: 'boss',
    context: `
      📌 <b>Артём вызывает тебя в переговорку:</b><br><br>
      <i>«Дима, финальное задание по CSS. На странице вакансий нужно сделать
      фиксированную шапку — она должна оставаться наверху при прокрутке.
      И ещё — бейдж "Горячая вакансия" должен висеть в углу карточки поверх всего.
      Это позиционирование. Без него не обходится ни один серьёзный проект.»</i><br><br>
      Ты открываешь редактор. Последнее задание CSS-модуля.
    `,
    theory: `
      <b>Позиционирование в CSS</b><br><br>

      По умолчанию все элементы идут друг за другом в потоке документа.
      Свойство <code>position</code> позволяет вырвать элемент из потока и разместить его точно.<br><br>

      <b>Значения position:</b><br><br>

      <code>static</code> — по умолчанию, элемент в обычном потоке.<br><br>

      <code>relative</code> — элемент остаётся в потоке, но можно сдвинуть его относительно
      его обычного места. Также создаёт контекст для <code>absolute</code>-потомков:<br>
      <pre><code>.card {
  position: relative;
}</code></pre>

      <code>absolute</code> — элемент вырывается из потока и позиционируется относительно
      ближайшего родителя с <code>position: relative</code>:<br>
      <pre><code>.badge {
  position: absolute;
  top: 10px;
  right: 10px;
}</code></pre>

      <code>fixed</code> — элемент фиксируется относительно окна браузера и не двигается при прокрутке:<br>
      <pre><code>.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}</code></pre>

      <code>sticky</code> — элемент ведёт себя как relative, пока не достигнет края экрана,
      потом «прилипает»:<br>
      <pre><code>.nav {
  position: sticky;
  top: 0;
}</code></pre>

      <b>z-index</b> — порядок наложения элементов. Больше значение — элемент поверх:<br>
      <pre><code>.modal {
  position: fixed;
  z-index: 1000;
}</code></pre>
    `,
    description: `
      ✏️ <b>Задание:</b> Добавь фиксированную шапку и бейдж на карточку вакансии.<br><br>
      1. Для <code>.header</code>: <code>position: fixed</code>, <code>top: 0</code>, <code>left: 0</code>, <code>width: 100%</code>, <code>z-index: 100</code><br>
      2. Для <code>.card</code>: <code>position: relative</code> (чтобы бейдж позиционировался внутри)<br>
      3. Для <code>.badge</code>: <code>position: absolute</code>, <code>top: 12px</code>, <code>right: 12px</code>
    `,
    starterCode: `<!-- HTML (не меняй) -->
<div class="header">
  <span>Шмякдекс — Вакансии</span>
</div>

<div style="margin-top: 70px; padding: 20px;">
  <div class="card">
    <span class="badge">🔥 Горячая</span>
    <h3>Frontend-разработчик</h3>
    <p>Удалённо · от 100 000 ₽</p>
    <p>Стек: React, TypeScript, CSS</p>
  </div>
</div>

<style>
  body { font-family: system-ui, sans-serif; margin: 0; }

  .header {
    background: #1e293b;
    color: white;
    padding: 16px 24px;
    /* Сделай шапку фиксированной */

  }

  .card {
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px;
    width: 320px;
    /* Добавь position для контекста бейджа */

  }

  .badge {
    background: #ef4444;
    color: white;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
    /* Позиционируй бейдж в правом верхнем углу */

  }
</style>`,
    check(code) {
      const headerBlock = code.match(/\.header\s*\{([^}]*)\}/s);
      const cardBlock = code.match(/\.card\s*\{([^}]*)\}/s);
      const badgeBlock = code.match(/\.badge\s*\{([^}]*)\}/s);

      if (!headerBlock) return { ok: false, hint: 'Найди блок .header { } и добавь свойства позиционирования.' };
      if (!/position\s*:\s*fixed/i.test(headerBlock[1]))
        return { ok: false, hint: 'Для .header добавь position: fixed;' };
      if (!/top\s*:\s*0/i.test(headerBlock[1]))
        return { ok: false, hint: 'Для .header добавь top: 0;' };
      if (!/left\s*:\s*0/i.test(headerBlock[1]))
        return { ok: false, hint: 'Для .header добавь left: 0;' };
      if (!/width\s*:\s*100%/i.test(headerBlock[1]))
        return { ok: false, hint: 'Для .header добавь width: 100%;' };
      if (!/z-index\s*:/i.test(headerBlock[1]))
        return { ok: false, hint: 'Для .header добавь z-index: 100; чтобы шапка была поверх контента.' };

      if (!cardBlock) return { ok: false, hint: 'Найди блок .card { } и добавь position: relative;' };
      if (!/position\s*:\s*relative/i.test(cardBlock[1]))
        return { ok: false, hint: 'Для .card добавь position: relative; — это нужно чтобы бейдж позиционировался внутри карточки.' };

      if (!badgeBlock) return { ok: false, hint: 'Найди блок .badge { } и добавь позиционирование.' };
      if (!/position\s*:\s*absolute/i.test(badgeBlock[1]))
        return { ok: false, hint: 'Для .badge добавь position: absolute;' };
      if (!/top\s*:\s*12px/i.test(badgeBlock[1]))
        return { ok: false, hint: 'Для .badge добавь top: 12px;' };
      if (!/right\s*:\s*12px/i.test(badgeBlock[1]))
        return { ok: false, hint: 'Для .badge добавь right: 12px;' };

      return { ok: true };
    },
    reward: '🏅 CSS-модуль пройден! Артём: «Отличная работа, Дима. Ты готов к JavaScript!»',
    colleagueTips: [
      { npc: 'colleague2', lines: [
        'Саша. position: fixed — прибивает к окну браузера. Не двигается при скролле.',
        'Для бейджа: сначала position: relative у родителя (.card), потом position: absolute у самого бейджа.',
        'top, right, bottom, left — координаты. top: 12px right: 12px — правый верхний угол.',
      ]},
      { npc: 'colleague1', lines: [
        'Маша! fixed — фиксированный (не скроллится), absolute — внутри родителя с relative.',
        'Схема: .card { position: relative } → .badge { position: absolute; top: 12px; right: 12px; }',
        'z-index у шапки нужен чтобы она была поверх карточек при прокрутке. Любое число > 0.',
      ]},
    ],
  },

];
