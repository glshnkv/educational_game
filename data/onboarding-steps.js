import { NPC_DATA } from './npc-data.js';

export function buildOnboardingSteps() {
  return [
    {
      type: 'dialog',
      npc: NPC_DATA.boss,
      text: 'Привет! Добро пожаловать в Кодликс. Я Артём, твой тимлид. Сегодня твой первый рабочий день — давай введу тебя в курс дела.',
    },
    {
      type: 'dialog',
      npc: NPC_DATA.boss,
      text: 'Это наш офис. Здесь работают Маша — дизайнер, и Саша — разработчик. Они помогут тебе с заданиями, если застрянешь.',
    },
    {
      type: 'dialog',
      npc: NPC_DATA.boss,
      text: 'Передвигаться по офису можно клавишами WASD или стрелками. Когда подойдёшь к кому-то — нажми E для взаимодействия.',
    },
    {
      type: 'dialog',
      npc: NPC_DATA.boss,
      text: 'Твоё рабочее место — стол с красной кружкой в центре офиса. Там стоит твой компьютер. Именно через него ты будешь выполнять задания.',
    },
    {
      type: 'dialog',
      npc: NPC_DATA.boss,
      text: 'Давай я покажу тебе, как работает компьютер. Сейчас открою его для тебя.',
      openComputer: true,
    },
    {
      type: 'highlight',
      target: 'screen-home',
      npc: NPC_DATA.boss,
      text: 'Это главный экран твоего рабочего места — Кодликс. Здесь видны твои прогресс по заданиям.',
      highlight: '#home-hero',
    },
    {
      type: 'highlight',
      target: 'screen-home',
      npc: NPC_DATA.boss,
      text: 'Задания разбиты по модулям: HTML, CSS и JavaScript. Каждый модуль — это набор практических задач. Кликай на карточку, чтобы открыть модуль.',
      highlight: '#module-grid',
    },
    {
      type: 'highlight',
      target: 'screen-kanban',
      npc: NPC_DATA.boss,
      text: 'Внутри модуля — канбан-доска. Задания делятся на три колонки: «К выполнению», «В работе» и «Выполнено». Всё как в настоящей команде.',
      highlight: '#kanban-board',
      navigateTo: 'kanban',
    },
    {
      type: 'highlight',
      target: 'screen-kanban',
      npc: NPC_DATA.boss,
      text: 'Нажми на карточку задания или кнопку «Открыть →», чтобы перейти к редактору кода.',
      highlight: '#col-todo',
    },
    {
      type: 'highlight',
      target: 'screen-editor',
      npc: NPC_DATA.boss,
      text: 'Это редактор кода. Слева — описание задачи и теория, справа — редактор и превью результата.',
      highlight: '#computer-workspace',
      navigateTo: 'editor',
    },
    {
      type: 'highlight',
      target: 'screen-editor',
      npc: NPC_DATA.boss,
      text: 'Пиши код здесь. Tab вставляет отступ. Код сохраняется автоматически — можешь закрыть и вернуться позже.',
      highlight: '#editor-gutter-wrap',
    },
    {
      type: 'highlight',
      target: 'screen-editor',
      npc: NPC_DATA.boss,
      text: '«Запустить» — показывает результат в превью справа. «Проверить» — проверяет правильность кода и даёт обратную связь.',
      highlight: '#editor-actions',
    },
    {
      type: 'highlight',
      target: 'screen-editor',
      npc: NPC_DATA.colleague1,
      text: 'Привет! Я Маша. Если застрянешь — подойди ко мне или Саше в офисе, нажми E. Мы дадим подсказку по активному заданию.',
      highlight: null,
    },
    {
      type: 'dialog',
      npc: NPC_DATA.boss,
      text: 'Вот и всё! Закрой компьютер крестиком, подойди к боссу и получи первое задание. Удачи, джун! 🚀',
      closeComputer: true,
    },
  ];
}
