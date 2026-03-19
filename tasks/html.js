// ============================================================
// HTML TASKS
// ============================================================

export const HTML_TASKS = [
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
];
