export const NPC_DATA = {
  boss: {
    name: 'Артём (Тимлид)',
    emoji: '👨‍💼',
    avatar: 'assets/images/artem-avatar.png',
    color: 'linear-gradient(135deg, #1e40af, #7c3aed)',
  },
  colleague1: {
    name: 'Маша (Дизайнер)',
    emoji: '👩‍🎨',
    avatar: 'assets/images/masha-avatar.png',
    color: 'linear-gradient(135deg, #be185d, #9333ea)',
  },
  colleague2: {
    name: 'Саша (Разработчик)',
    emoji: '🧑‍💻',
    avatar: 'assets/images/sasha-avatar.png',
    color: 'linear-gradient(135deg, #065f46, #0369a1)',
  },
};

export const NPC_DIALOGS = {
  boss: {
    npcId: 'boss',
    lines: [
      'Привет, Дима! Добро пожаловать в Шмякдекс.',
      'Я Артём, твой тимлид. У нас тут всё по-взрослому — задачи в Jira, стендапы в 10:00.',
      'Первое задание уже ждёт тебя. Нужно починить страницу приветствия на портале.',
      'Садись за свой компьютер и разберись. Это несложно, я верю в тебя!',
    ],
    taskId: 'html-1-tags',
  },
  colleague1: {
    npcId: 'colleague1',
    lines: [
      'О, привет! Ты новенький? Я Маша, занимаюсь дизайном.',
      'Слушай, тут такая беда — кнопка «Отправить отчёт» выглядит как из 2005 года.',
      'Можешь добавить ей нормальные стили? Цвет, скругление, отступы — ты знаешь.',
    ],
    taskId: 'css-button',
  },
  colleague2: {
    npcId: 'colleague2',
    lines: [
      'Йоу, Дима! Саша, фронтенд-разработчик.',
      'Мне тут нужна помощь — надо добавить счётчик лайков в корпоративную ленту.',
      'Просто JS: кнопка кликается — число растёт. Классика!',
    ],
    taskId: 'js-counter',
  },
};
