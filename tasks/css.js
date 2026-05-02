// ============================================================
// CSS TASKS
// ============================================================

import { findCssRule, hasCssDeclaration } from '../core/task-check-utils.js';

export const CSS_TASKS = [
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
    introDialog: [
      'Дима, HTML-страница уже собрана, но выглядит как черновик: всё без цвета, без акцентов и без нормального размера текста.',
      'В этой задаче ты впервые подключишь CSS-логику: выберешь элементы по селекторам и задашь им свойства.',
      'Нужно стилизовать заголовок, подзаголовок и обычные абзацы. Это база, с которой начинается почти любая визуальная правка.',
      'Сначала разберись с селекторами, свойствами и значениями, затем открой код и оживи страницу первыми стилями.',
    ],
    brief: 'В <code>&lt;style&gt;</code> задай цвет для <code>h1</code>, цвет для <code>.subtitle</code> и <code>font-size: 16px</code> для <code>p</code>.',
    theory: `
      <b>CSS — язык внешнего вида страницы</b><br><br>
      HTML отвечает за смысл и структуру: где заголовок, где абзац, где ссылка. CSS отвечает за то,
      как эти элементы выглядят: цвет, размер, отступы, фон, расположение на экране. Один и тот же HTML
      можно сделать строгим, игровым, минималистичным или ярким — меняя только CSS.<br><br>

      <b>CSS-правило состоит из трёх частей</b><br>
      <pre><code>селектор {
  свойство: значение;
}</code></pre>
      <code>селектор</code> выбирает элементы на странице;<br>
      <code>свойство</code> говорит, что именно изменить;<br>
      <code>значение</code> говорит, на что изменить.<br><br>

      <b>Пример:</b><br>
      <pre><code>p {
  color: navy;
  font-size: 16px;
}</code></pre>
      Это значит: «найди все абзацы <code>&lt;p&gt;</code>, сделай текст тёмно-синим и размером 16 пикселей».
      Каждое объявление заканчивается точкой с запятой. Фигурные скобки показывают, где начинается и
      заканчивается набор стилей.<br><br>

      <b>Три базовых селектора</b><br>
      <code>h1</code> — селектор по тегу. Применится ко всем <code>&lt;h1&gt;</code>:<br>
      <pre><code>h1 {
  color: darkblue;
}</code></pre>
      <code>.subtitle</code> — селектор по классу. Точка означает «найди элементы с class="subtitle"»:<br>
      <pre><code>.subtitle {
  color: gray;
}</code></pre>
      <code>#logo</code> — селектор по id. Решётка означает «найди элемент с id="logo"». Такой id должен
      быть уникальным на странице.<br><br>

      <b>Цвета в CSS</b><br>
      Цвет можно записать словом: <code>red</code>, <code>blue</code>, <code>white</code>;<br>
      HEX-кодом: <code>#ff0000</code>, <code>#3b82f6</code>;<br>
      RGB-форматом: <code>rgb(255, 0, 0)</code>.<br><br>

      <b>Важно для читабельности:</b> если текст по умолчанию чёрный, цвет заголовка лучше сделать
      заметно другим. Но не стоит выбирать цвет только потому, что он яркий: текст должен хорошо читаться.
    `,
    description: `
      ✏️ <b>Задание:</b> Оживи страницу «О компании» первыми стилями.<br><br>
      В блоке <code>&lt;style&gt;</code> напиши CSS:<br>
      1. Для тега <code>h1</code> задай <code>color</code> любого цвета (не чёрный)<br>
      2. Для класса <code>.subtitle</code> задай <code>color</code> любого цвета<br>
      3. Для тега <code>p</code> задай <code>font-size: 16px</code>
    `,
    starterCode: `<!-- HTML (не меняй) -->
<h1>О компании Кодликс</h1>
<p class="subtitle">Делаем интернет лучше с 2010 года</p>
<p>Наша команда — 500 крутых специалистов со всей страны.</p>
<p>Мы верим, что технологии меняют мир к лучшему.</p>

<style>
  /* Напиши стили здесь */

</style>`,
    check(code) {
      const h1Block = findCssRule(code, 'h1');
      if (!h1Block || !hasCssDeclaration(h1Block, 'color', /^(?!black\b|#000(?:000)?\b).+/i))
        return { ok: false, hint: 'Добавь стиль для h1: h1 { color: значение; } Цвет должен быть не чёрным.' };

      const subtitleBlock = findCssRule(code, '\\.subtitle');
      if (!subtitleBlock || !hasCssDeclaration(subtitleBlock, 'color'))
        return { ok: false, hint: 'Добавь стиль для класса .subtitle: .subtitle { color: значение; }' };

      const pBlock = findCssRule(code, 'p');
      if (!pBlock || !hasCssDeclaration(pBlock, 'font-size', /^16px$/i))
        return { ok: false, hint: 'Добавь для тега p: p { font-size: 16px; }' };

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
    introDialog: [
      'Дима, карточка сотрудника сейчас выглядит слипшейся: текст прижат к краям, рамки нет, ширина не похожа на макет.',
      'В CSS каждый элемент можно представить как прямоугольник: внутри есть контент, вокруг него padding, затем border и margin.',
      'Тебе нужно превратить обычный div в аккуратную карточку: добавить воздух, рамку, скругление, внешний отступ и фиксированную ширину.',
      'После теории зайди в блок .card и настрой его так, чтобы карточка стала похожа на элемент настоящего интерфейса.',
    ],
    brief: 'Для <code>.card</code> задай <code>padding: 20px</code>, <code>margin: 16px</code>, рамку <code>solid</code>, <code>border-radius: 12px</code> и <code>width: 280px</code>.',
    theory: `
      <b>Блочная модель: каждый элемент — прямоугольник</b><br><br>
      В CSS почти любой элемент можно представить как коробку. Даже если это просто абзац текста, у него
      есть содержимое, внутренние отступы, рамка и внешние отступы. Понимание box model помогает делать
      аккуратные карточки, кнопки, панели и формы.<br><br>

      <b>Четыре слоя элемента</b><br>
      <code>content</code> — содержимое: текст, картинка, кнопка;<br>
      <code>padding</code> — внутренний отступ между содержимым и рамкой;<br>
      <code>border</code> — рамка вокруг элемента;<br>
      <code>margin</code> — внешний отступ между элементом и соседями.<br>
      <pre><code>margin
  border
    padding
      content</code></pre>

      <b>Padding и margin часто путают</b><br>
      <code>padding</code> добавляет «воздух» внутри элемента. Например, текст в карточке не прилипает к
      краю.<br>
      <code>margin</code> отодвигает элемент от других элементов снаружи.<br>
      <pre><code>.card {
  padding: 20px;
  margin: 16px;
}</code></pre>

      <b>Рамка: border</b><br>
      Рамка обычно задаётся тремя частями: толщина, стиль, цвет.<br>
      <pre><code>.card {
  border: 2px solid #3b82f6;
}</code></pre>
      <code>2px</code> — толщина, <code>solid</code> — сплошная линия, <code>#3b82f6</code> — цвет.
      Другие стили рамки: <code>dashed</code> (пунктир), <code>dotted</code> (точки).<br><br>

      <b>Скругление углов</b><br>
      <code>border-radius</code> делает углы мягче. Например, <code>12px</code> хорошо подходит для
      карточки: она выглядит аккуратно, но не превращается в круг.<br>
      <pre><code>.card {
  border-radius: 12px;
}</code></pre>

      <b>Ширина</b><br>
      <code>width</code> задаёт ширину элемента. Если карточке дать <code>width: 280px</code>, браузер
      будет стараться сделать её шириной 280 пикселей.<br><br>

      <b>Практическое правило:</b> для карточки обычно нужны сразу несколько свойств: ширина, внутренний
      отступ, внешний отступ, рамка и скругление. Только вместе они дают ощущение готового интерфейса.
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
      const props = findCssRule(code, '\\.card');
      if (!props) return { ok: false, hint: 'Найди блок .card { } и пиши стили внутри него.' };

      if (!hasCssDeclaration(props, 'padding', /^20px$/i))
        return { ok: false, hint: 'Добавь padding: 20px; внутри .card { }' };
      if (!hasCssDeclaration(props, 'margin', /^16px$/i))
        return { ok: false, hint: 'Добавь margin: 16px; внутри .card { }' };
      if (!hasCssDeclaration(props, 'border', /^(?:[1-3](?:\.0+)?px\s+solid\b|solid\b.*\b[1-3](?:\.0+)?px\b)/i))
        return { ok: false, hint: 'Добавь border, например: border: 2px solid #3b82f6;' };
      if (!hasCssDeclaration(props, 'border-radius', /^12px$/i))
        return { ok: false, hint: 'Добавь border-radius: 12px; для скруглённых углов.' };
      if (!hasCssDeclaration(props, 'width', /^280px$/i))
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
    introDialog: [
      'Дима, дизайнер прислал требования к тексту для блога. Это не про украшения, а про читаемость.',
      'Заголовок должен сразу считываться как главный, подзаголовок должен быть спокойнее, а обычные абзацы — легко читаться.',
      'В этой задаче ты настроишь размер, жирность, курсив, цвет, выравнивание и межстрочный интервал.',
      'Изучи теорию по типографике и затем приведи текст блога к макету через CSS.',
    ],
    brief: 'Настрой типографику: для <code>h1</code> — <code>32px</code>, <code>bold</code>, центр; для <code>.lead</code> — курсив и серый цвет; для <code>p</code> — <code>line-height: 1.7</code>.',
    theory: `
      <b>Типографика — это удобство чтения</b><br><br>
      Типографика отвечает за то, как выглядит текст: размер, жирность, курсив, цвет, выравнивание и
      расстояние между строками. Хорошая типографика не просто «красивая» — она помогает быстрее читать
      и понимать страницу.<br><br>

      <b>Размер текста: font-size</b><br>
      <code>font-size</code> задаёт размер букв. Для обычного текста часто используют около
      <code>16px</code>, а заголовки делают крупнее, чтобы показать важность.<br>
      <pre><code>h1 {
  font-size: 32px;
}</code></pre>

      <b>Жирность: font-weight</b><br>
      <code>font-weight: bold</code> делает текст жирным. Так удобно выделять заголовки и важные слова.
      В CSS можно встретить и числовые значения: <code>400</code> — обычный текст,
      <code>700</code> — жирный.<br><br>

      <b>Курсив: font-style</b><br>
      <code>font-style: italic</code> наклоняет текст. Курсив хорошо подходит для подзаголовка, цитаты
      или короткого пояснения, но им не стоит оформлять большие абзацы: читать будет тяжелее.<br><br>

      <b>Выравнивание: text-align</b><br>
      <code>text-align: center</code> выравнивает текст по центру. Это часто используют для главных
      заголовков. Для длинных абзацев обычно удобнее выравнивание по левому краю.<br><br>

      <b>Межстрочный интервал: line-height</b><br>
      Если строки слишком близко, текст выглядит сжатым. <code>line-height</code> задаёт расстояние между
      строками. Значение <code>1.7</code> означает: высота строки примерно в 1.7 раза больше размера
      шрифта.<br>
      <pre><code>p {
  line-height: 1.7;
}</code></pre>
      У <code>line-height: 1.7</code> нет единицы измерения. Это удобно: если размер шрифта изменится,
      интервал подстроится сам.<br><br>

      <b>Цвет текста</b><br>
      Серый цвет вроде <code>#555</code> часто используют для второстепенного текста. Он спокойнее
      чёрного, но всё ещё хорошо читается на белом фоне.
    `,
    description: `
      ✏️ <b>Задание:</b> Настрой типографику для корпоративного блога.<br><br>
      1. Для <code>h1</code>: размер <code>32px</code>, жирный (<code>font-weight: bold</code>), выравнивание по центру<br>
      2. Для <code>.lead</code>: курсив (<code>font-style: italic</code>), цвет <code>#555</code> или любой серый<br>
      3. Для <code>p</code>: межстрочный интервал <code>line-height: 1.7</code>
    `,
    starterCode: `<!-- HTML (не меняй) -->
<h1>Корпоративный блог Кодликса</h1>
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
      const h1Block = findCssRule(code, 'h1');
      const leadBlock = findCssRule(code, '\\.lead');
      const pBlock = findCssRule(code, 'p');

      if (!h1Block) return { ok: false, hint: 'Найди блок h1 { } и добавь стили внутри.' };
      if (!hasCssDeclaration(h1Block, 'font-size', /^32px$/i))
        return { ok: false, hint: 'Для h1 задай font-size: 32px;' };
      if (!hasCssDeclaration(h1Block, 'font-weight', /^bold$/i))
        return { ok: false, hint: 'Для h1 задай font-weight: bold;' };
      if (!hasCssDeclaration(h1Block, 'text-align', /^center$/i))
        return { ok: false, hint: 'Для h1 задай text-align: center;' };

      if (!leadBlock) return { ok: false, hint: 'Найди блок .lead { } и добавь стили.' };
      if (!hasCssDeclaration(leadBlock, 'font-style', /^italic$/i))
        return { ok: false, hint: 'Для .lead задай font-style: italic;' };
      if (!hasCssDeclaration(leadBlock, 'color'))
        return { ok: false, hint: 'Для .lead задай color: #555; (или любой серый цвет).' };

      if (!pBlock) return { ok: false, hint: 'Найди блок p { } и добавь стили.' };
      if (!hasCssDeclaration(pBlock, 'line-height', /^1\.7$/i))
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
    introDialog: [
      'Дима, главная страница пока вся белая, поэтому блоки сливаются и не ощущаются как отдельные части интерфейса.',
      'Дизайнер хочет тёмную шапку и заметный баннер с градиентом. Это быстрый способ показать структуру и настроение страницы.',
      'Тебе нужно задать фон, цвет текста и внутренние отступы, чтобы текст не прилипал к краям.',
      'После теории оформи header и banner так, чтобы страница стала похожа на настоящий промо-блок Кодликса.',
    ],
    brief: 'Для <code>.header</code> задай тёмный фон и <code>color: white</code>. Для <code>.banner</code> добавь <code>linear-gradient</code>, <code>color: white</code> и <code>padding: 40px</code>.',
    theory: `
      <b>Фон задаёт настроение блока</b><br><br>
      Цвет фона помогает разделить страницу на части: шапку, баннер, карточки, предупреждения. Пользователь
      быстрее понимает структуру, если важные блоки визуально отличаются друг от друга.<br><br>

      <b>Однотонный фон: background-color</b><br>
      <code>background-color</code> задаёт сплошной цвет фона.<br>
      <pre><code>.header {
  background-color: #111827;
}</code></pre>
      Для шапки часто выбирают тёмный фон: он создаёт ощущение отдельной верхней панели.<br><br>

      <b>Цвет текста на фоне: color</b><br>
      Если фон тёмный, текст должен быть светлым. Иначе он сольётся с фоном, и страницу будет трудно
      читать.<br>
      <pre><code>.header {
  background-color: #111827;
  color: white;
}</code></pre>

      <b>Градиент: плавный переход между цветами</b><br>
      Градиент используют для баннеров, кнопок и выделенных блоков. Он создаёт более живой вид, чем
      обычный однотонный фон.<br>
      <pre><code>.banner {
  background: linear-gradient(135deg, #2563eb, #16a34a);
}</code></pre>
      <code>135deg</code> — направление перехода, дальше идут два или больше цвета. Вместо угла можно
      писать направление: <code>to right</code>, <code>to bottom</code>.<br><br>

      <b>Padding нужен не только карточкам</b><br>
      Даже красивый фон будет выглядеть плохо, если текст прижат к краям. Поэтому баннеру часто задают
      внутренний отступ:<br>
      <pre><code>.banner {
  padding: 40px;
}</code></pre>

      <b>Контраст — главное правило</b><br>
      Дизайн считается хорошим не тогда, когда он максимально яркий, а когда его удобно читать.
      Тёмный фон + белый текст — простой и надёжный вариант для первого шага.
    `,
    description: `
      ✏️ <b>Задание:</b> Оформи шапку и баннер главной страницы Кодликса.<br><br>
      1. Для <code>.header</code>: тёмный <code>background-color</code> (любой тёмный) и <code>color: white</code><br>
      2. Для <code>.banner</code>: градиент через <code>background: linear-gradient(...)</code> с двумя любыми цветами<br>
      3. Для <code>.banner</code> также задай <code>color: white</code> и <code>padding: 40px</code>
    `,
    starterCode: `<!-- HTML (не меняй) -->
<div class="header">
  <h1>Кодликс</h1>
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
      const headerBlock = findCssRule(code, '\\.header');
      const bannerBlock = findCssRule(code, '\\.banner');

      if (!headerBlock) return { ok: false, hint: 'Найди блок .header { } и добавь стили.' };
      if (!hasCssDeclaration(headerBlock, 'background-color') && !hasCssDeclaration(headerBlock, 'background'))
        return { ok: false, hint: 'Для .header добавь background-color с тёмным цветом.' };
      if (!hasCssDeclaration(headerBlock, 'color', /^(white|#fff|#ffffff)$/i))
        return { ok: false, hint: 'Для .header добавь color: white; чтобы текст был виден на тёмном фоне.' };

      if (!bannerBlock) return { ok: false, hint: 'Найди блок .banner { } и добавь стили.' };
      if (!hasCssDeclaration(bannerBlock, 'background', /linear-gradient/i))
        return { ok: false, hint: 'Для .banner добавь градиент: background: linear-gradient(135deg, #цвет1, #цвет2);' };
      if (!hasCssDeclaration(bannerBlock, 'color', /^(white|#fff|#ffffff)$/i))
        return { ok: false, hint: 'Для .banner добавь color: white;' };
      if (!hasCssDeclaration(bannerBlock, 'padding', /^40px$/i))
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
    introDialog: [
      'Дима, на странице команды всё развалилось: карточки идут столбиком, а кнопка в шапке не уходит вправо.',
      'Это задача не про цвет, а про раскладку. Нужно управлять тем, как элементы стоят относительно друг друга.',
      'Flexbox включается у родителя и позволяет выстроить элементы в ряд, разнести их по краям, центрировать и переносить на новую строку.',
      'Разберись с flex-свойствами, затем исправь навигацию и сетку карточек команды.',
    ],
    brief: 'Для <code>.nav</code> включи Flexbox, <code>space-between</code> и центрирование. Для <code>.cards</code> включи flex, перенос и <code>gap: 20px</code>. Для <code>.card</code> задай <code>width: 200px</code>.',
    theory: `
      <b>Flexbox — способ управлять расположением элементов</b><br><br>
      В HTML блоки по умолчанию часто идут сверху вниз. Но в интерфейсах нам нужны строки карточек,
      панели навигации, кнопки по краям, элементы по центру. Для таких задач удобно использовать Flexbox.<br><br>

      <b>Flexbox включается у родителя</b><br>
      Важно: <code>display: flex</code> пишут не на самих карточках, а на контейнере, внутри которого
      лежат эти карточки.<br>
      <pre><code>.cards {
  display: flex;
}</code></pre>
      После этого прямые дочерние элементы контейнера становятся flex-элементами и обычно выстраиваются
      в строку.<br><br>

      <b>Главная и поперечная оси</b><br>
      По умолчанию Flexbox располагает элементы слева направо. Это главная ось. Поперечная ось идёт
      сверху вниз. Поэтому разные свойства отвечают за разные направления.<br><br>

      <b>justify-content — распределение по главной оси</b><br>
      <code>justify-content: space-between</code> раздвигает элементы: первый уходит к левому краю,
      последний — к правому, а свободное место оказывается между ними. Это удобно для шапки сайта:
      логотип слева, кнопка справа.<br>
      <pre><code>.nav {
  display: flex;
  justify-content: space-between;
}</code></pre>

      <b>align-items — выравнивание по поперечной оси</b><br>
      <code>align-items: center</code> выравнивает элементы по центру по высоте. Без этого кнопка и логотип
      могут выглядеть так, будто стоят на разных уровнях.<br><br>

      <b>flex-wrap — перенос на новую строку</b><br>
      Если карточек много, они могут не поместиться в одну строку. <code>flex-wrap: wrap</code> разрешает
      переносить карточки ниже, вместо того чтобы сжимать их до нечитаемого размера.<br><br>

      <b>gap — расстояние между элементами</b><br>
      <code>gap: 20px</code> добавляет одинаковые промежутки между карточками. Это аккуратнее, чем задавать
      margin каждой карточке отдельно.<br><br>

      <b>Типичная схема:</b><br>
      <pre><code>.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}</code></pre>
    `,
    description: `
      ✏️ <b>Задание:</b> Исправь раскладку страницы команды с помощью Flexbox.<br><br>
      1. Для <code>.nav</code>: включи flex, выравнивание <code>justify-content: space-between</code> и <code>align-items: center</code><br>
      2. Для <code>.cards</code>: включи flex, добавь <code>flex-wrap: wrap</code> и <code>gap: 20px</code><br>
      3. Для <code>.card</code>: задай <code>width: 200px</code>
    `,
    starterCode: `<!-- HTML (не меняй) -->
<nav class="nav">
  <span class="logo">Кодликс</span>
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
      const navBlock = findCssRule(code, '\\.nav');
      const cardsBlock = findCssRule(code, '\\.cards');
      const cardBlock = findCssRule(code, '\\.card');

      if (!navBlock) return { ok: false, hint: 'Найди блок .nav { } и добавь flex-свойства.' };
      if (!hasCssDeclaration(navBlock, 'display', /^flex$/i))
        return { ok: false, hint: 'Для .nav добавь display: flex;' };
      if (!hasCssDeclaration(navBlock, 'justify-content', /^space-between$/i))
        return { ok: false, hint: 'Для .nav добавь justify-content: space-between;' };
      if (!hasCssDeclaration(navBlock, 'align-items', /^center$/i))
        return { ok: false, hint: 'Для .nav добавь align-items: center;' };

      if (!cardsBlock) return { ok: false, hint: 'Найди блок .cards { } и добавь flex-свойства.' };
      if (!hasCssDeclaration(cardsBlock, 'display', /^flex$/i))
        return { ok: false, hint: 'Для .cards добавь display: flex;' };
      if (!hasCssDeclaration(cardsBlock, 'flex-wrap', /^wrap$/i))
        return { ok: false, hint: 'Для .cards добавь flex-wrap: wrap;' };
      if (!hasCssDeclaration(cardsBlock, 'gap', /^20px$/i))
        return { ok: false, hint: 'Для .cards добавь gap: 20px;' };

      if (!cardBlock) return { ok: false, hint: 'Найди блок .card { } и задай ширину.' };
      if (!hasCssDeclaration(cardBlock, 'width', /^200px$/i))
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
    introDialog: [
      'Дима, интерфейс сейчас статичный: кнопки и карточка никак не реагируют на действия пользователя.',
      'Когда элемент меняется при наведении, пользователь сразу понимает, что с ним можно взаимодействовать.',
      'Тебе нужно добавить cursor, плавный transition, hover-цвет для кнопок и эффект приподнимания карточки.',
      'После теории настрой состояния так, чтобы интерфейс стал живее, но без резких скачков.',
    ],
    brief: 'Добавь для <code>.btn</code> <code>transition</code> и <code>cursor: pointer</code>, для <code>.btn:hover</code> — новый фон, для <code>.card:hover</code> — <code>translateY(-4px)</code> и тень.',
    theory: `
      <b>Интерфейс должен реагировать на действия пользователя</b><br><br>
      Когда кнопка меняет цвет при наведении, а карточка слегка поднимается, пользователь понимает:
      «на это можно нажать». Такие реакции делают сайт живым и понятным.<br><br>

      <b>Псевдокласс — состояние элемента</b><br>
      Псевдокласс пишется после селектора через двоеточие. Он выбирает элемент не просто по имени или
      классу, а по состоянию.<br>
      <pre><code>.btn:hover {
  background-color: #1d4ed8;
}</code></pre>
      <code>:hover</code> срабатывает, когда на элемент навели курсор. Для кнопки это хороший момент
      изменить цвет фона.<br><br>

      <b>Другие полезные состояния</b><br>
      <code>:active</code> — момент нажатия;<br>
      <code>:focus</code> — элемент выбран с клавиатуры или через поле ввода.<br>
      Эти состояния важны для удобства и доступности интерфейса.<br><br>

      <b>cursor: pointer</b><br>
      Если элемент кликабельный, курсор-стрелка обычно меняется на «руку». Это задаётся так:<br>
      <pre><code>.btn {
  cursor: pointer;
}</code></pre>

      <b>transition — плавность изменений</b><br>
      Без <code>transition</code> цвет или тень меняются мгновенно. С transition изменение выглядит
      плавным.<br>
      <pre><code>.btn {
  transition: all 0.3s ease;
}</code></pre>
      <code>all</code> — анимировать все изменяемые свойства;<br>
      <code>0.3s</code> — длительность 0.3 секунды;<br>
      <code>ease</code> — естественное ускорение и замедление.<br><br>

      <b>transform и box-shadow</b><br>
      <code>transform: translateY(-4px)</code> сдвигает элемент вверх на 4 пикселя. Минус по оси Y —
      это вверх.<br>
      <code>box-shadow</code> добавляет тень. Если карточка приподнялась и получила тень, мозг считывает
      её как интерактивную поверхность.<br>
      <pre><code>.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}</code></pre>
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
      const btnBlock = findCssRule(code, '\\.btn');
      const btnHoverBlock = findCssRule(code, '\\.btn\\s*:\\s*hover');
      const cardHoverBlock = findCssRule(code, '\\.card\\s*:\\s*hover');

      if (!btnBlock) return { ok: false, hint: 'Найди блок .btn { } и добавь свойства.' };
      if (!hasCssDeclaration(btnBlock, 'transition', /0\.3s/i))
        return { ok: false, hint: 'Для .btn добавь transition: all 0.3s ease;' };
      if (!hasCssDeclaration(btnBlock, 'cursor', /^pointer$/i))
        return { ok: false, hint: 'Для .btn добавь cursor: pointer;' };

      if (!btnHoverBlock) return { ok: false, hint: 'Добавь блок .btn:hover { } с изменением цвета фона.' };
      if (!hasCssDeclaration(btnHoverBlock, 'background-color') && !hasCssDeclaration(btnHoverBlock, 'background'))
        return { ok: false, hint: 'В .btn:hover измени background-color на более тёмный.' };

      if (!cardHoverBlock) return { ok: false, hint: 'Добавь блок .card:hover { } с эффектами.' };
      if (!hasCssDeclaration(cardHoverBlock, 'transform', /translateY\s*\(\s*-4px\s*\)/i))
        return { ok: false, hint: 'В .card:hover добавь transform: translateY(-4px);' };
      if (!hasCssDeclaration(cardHoverBlock, 'box-shadow'))
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
    introDialog: [
      'Дима, финальная CSS-задача: нужно управлять элементами не только в потоке страницы, но и слоями поверх интерфейса.',
      'Шапка вакансий должна оставаться наверху при прокрутке, а бейдж “Горячая” должен висеть в углу карточки.',
      'Для этого понадобятся fixed, relative, absolute, координаты top/right/left и z-index.',
      'Сначала разберись, кто относительно чего позиционируется, затем закрепи шапку и поставь бейдж в правый верхний угол карточки.',
    ],
    brief: 'Сделай <code>.header</code> фиксированной сверху, <code>.card</code> — относительным контейнером, а <code>.badge</code> — абсолютным бейджем с <code>top: 12px</code> и <code>right: 12px</code>.',
    theory: `
      <b>Позиционирование — точное размещение элементов</b><br><br>
      Обычно элементы идут в обычном потоке страницы: один за другим, сверху вниз. Но иногда нужно
      разместить элемент особым образом: закрепить шапку сверху экрана или поставить бейдж в угол
      карточки. Для этого используют свойство <code>position</code>.<br><br>

      <b>static — обычное поведение</b><br>
      <code>position: static</code> стоит у элементов по умолчанию. Координаты
      <code>top</code>, <code>left</code>, <code>right</code>, <code>bottom</code> на него не влияют.<br><br>

      <b>fixed — закрепить относительно окна браузера</b><br>
      Если шапка должна оставаться сверху даже при прокрутке, используют <code>position: fixed</code>.
      Такой элемент привязан к окну браузера, а не к месту в документе.<br>
      <pre><code>.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}</code></pre>
      <code>top: 0</code> и <code>left: 0</code> ставят шапку в левый верхний угол,
      <code>width: 100%</code> растягивает её на всю ширину.<br><br>

      <b>relative — создать точку отсчёта</b><br>
      <code>position: relative</code> часто ставят родителю, чтобы его дочерний элемент с
      <code>absolute</code> позиционировался внутри него.<br>
      <pre><code>.card {
  position: relative;
}</code></pre>
      Сама карточка при этом остаётся на своём обычном месте.<br><br>

      <b>absolute — точно поставить внутри ближайшего positioned-родителя</b><br>
      Если у бейджа <code>position: absolute</code>, а у карточки <code>position: relative</code>, то
      координаты бейджа считаются от карточки.<br>
      <pre><code>.badge {
  position: absolute;
  top: 12px;
  right: 12px;
}</code></pre>
      Это значит: «поставь бейдж на 12 пикселей от верхнего и правого края карточки».<br><br>

      <b>z-index — кто лежит сверху</b><br>
      Когда элементы перекрываются, <code>z-index</code> управляет порядком слоёв. Большее число обычно
      означает, что элемент выше. Для фиксированной шапки часто задают <code>z-index</code>, чтобы она не
      оказалась под карточками.<br><br>

      <b>Практическая связка:</b> шапке нужен <code>fixed</code>, карточке — <code>relative</code>, бейджу
      внутри карточки — <code>absolute</code>.
    `,
    description: `
      ✏️ <b>Задание:</b> Добавь фиксированную шапку и бейдж на карточку вакансии.<br><br>
      1. Для <code>.header</code>: <code>position: fixed</code>, <code>top: 0</code>, <code>left: 0</code>, <code>width: 100%</code>, <code>z-index: 100</code><br>
      2. Для <code>.card</code>: <code>position: relative</code> (чтобы бейдж позиционировался внутри)<br>
      3. Для <code>.badge</code>: <code>position: absolute</code>, <code>top: 12px</code>, <code>right: 12px</code>
    `,
    starterCode: `<!-- HTML (не меняй) -->
<div class="header">
  <span>Кодликс — Вакансии</span>
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
      const headerBlock = findCssRule(code, '\\.header');
      const cardBlock = findCssRule(code, '\\.card');
      const badgeBlock = findCssRule(code, '\\.badge');

      if (!headerBlock) return { ok: false, hint: 'Найди блок .header { } и добавь свойства позиционирования.' };
      if (!hasCssDeclaration(headerBlock, 'position', /^fixed$/i))
        return { ok: false, hint: 'Для .header добавь position: fixed;' };
      if (!hasCssDeclaration(headerBlock, 'top', /^0(?:px)?$/i))
        return { ok: false, hint: 'Для .header добавь top: 0;' };
      if (!hasCssDeclaration(headerBlock, 'left', /^0(?:px)?$/i))
        return { ok: false, hint: 'Для .header добавь left: 0;' };
      if (!hasCssDeclaration(headerBlock, 'width', /^100%$/i))
        return { ok: false, hint: 'Для .header добавь width: 100%;' };
      if (!hasCssDeclaration(headerBlock, 'z-index', /^100$/i))
        return { ok: false, hint: 'Для .header добавь z-index: 100; чтобы шапка была поверх контента.' };

      if (!cardBlock) return { ok: false, hint: 'Найди блок .card { } и добавь position: relative;' };
      if (!hasCssDeclaration(cardBlock, 'position', /^relative$/i))
        return { ok: false, hint: 'Для .card добавь position: relative; — это нужно чтобы бейдж позиционировался внутри карточки.' };

      if (!badgeBlock) return { ok: false, hint: 'Найди блок .badge { } и добавь позиционирование.' };
      if (!hasCssDeclaration(badgeBlock, 'position', /^absolute$/i))
        return { ok: false, hint: 'Для .badge добавь position: absolute;' };
      if (!hasCssDeclaration(badgeBlock, 'top', /^12px$/i))
        return { ok: false, hint: 'Для .badge добавь top: 12px;' };
      if (!hasCssDeclaration(badgeBlock, 'right', /^12px$/i))
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
