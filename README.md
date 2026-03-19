# Educational Game

Тренажёр по HTML/CSS/JS в формате 3D-офиса (Three.js) с заданиями, канбан-доской и онбордингом.

## Быстрый старт

1. Запусти любой статический сервер из корня проекта:
   - `python3 -m http.server 8080`
   - или `npx serve .`
2. Открой `http://localhost:8080`.

`index.html` использует `importmap` и ESM-модули, поэтому запуск через `file://` не подходит.

## Структура

- `index.html` — разметка экрана игры и UI-оверлеев.
- `game.js` — сцена Three.js, персонажи, движение, зоны взаимодействий.
- `game_parts/` — декомпозированные части игрового слоя:
  - `scene-builder.js` — построение сцены, мебели и персонажей.
  - `player-name.js` — экран имени и применение имени игрока.
  - `interaction.js` — зоны интеракции и обработка взаимодействий.
  - `game-loop.js` — игровой цикл (движение, камера, рендер).
  - `lifecycle.js` — resize и освобождение ресурсов.
- `ui.js` — окно компьютера, канбан, редактор, проверка задач.
- `ui_parts/` — декомпозированные части UI:
  - `modules.js` — конфигурация учебных модулей.
  - `kanban.js` — home/kanban рендеринг.
  - `editor.js` — редактор, превью, проверка.
  - `dialog.js` — диалоги NPC.
  - `settings.js` — настройки и reset.
- `tasks.js` — агрегатор всех задач.
- `tasks/html.js` — задачи HTML.
- `tasks/css.js` — задачи CSS.
- `tasks/js.js` — задачи JavaScript.
- `onboarding.js` — сценарий первого запуска.
- `core/` — инфраструктура (константы, storage, sanitizer, task-schema).
- `data/` — данные NPC и шаги онбординга.
- `tests/` — базовые автотесты на целостность данных и конфигурации.

## Команды качества

- `npm run lint` — проверка ESLint.
- `npm run validate:tasks` — проверка схемы задач.
- `npm run test` — автотесты (`node --test`).
- `npm run check` — полный локальный gate.

## Как добавить новую задачу

1. Добавь объект в нужный модульный файл: `tasks/html.js`, `tasks/css.js` или `tasks/js.js`.
2. Укажи:
   - уникальный `id`,
   - `module` (`html` | `css` | `js`),
   - `title`, `starterCode`,
   - функцию `check(code) => { ok: boolean, hint?: string }`.
3. Запусти `npm run validate:tasks` и `npm run test`.

## Хранилище в браузере

- Прогресс: `shmyakdex_progress`
- Онбординг: `shmyakdex_onboarding_done`
- Имя игрока: `shmyakdex_player_name`
