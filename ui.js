// ============================================================
// UI MANAGER — 3-screen computer flow
// ============================================================
import { TASKS } from './tasks.js';

// Module definitions — taskIds собираются динамически из TASKS по полю module
function buildModules() {
  return [
    {
      id: 'html',
      name: 'HTML',
      icon: '🌐',
      desc: 'Структура веб-страниц. Теги, атрибуты, семантика.',
      color: 'color-html',
      taskIds: TASKS.filter(t => t.module === 'html' || t.id.startsWith('html')).map(t => t.id),
    },
    {
      id: 'css',
      name: 'CSS',
      icon: '🎨',
      desc: 'Стилизация элементов. Цвета, отступы, анимации.',
      color: 'color-css',
      taskIds: TASKS.filter(t => t.module === 'css' || t.id.startsWith('css')).map(t => t.id),
    },
    {
      id: 'js',
      name: 'JavaScript',
      icon: '⚡',
      desc: 'Интерактивность. События, DOM, логика.',
      color: 'color-js',
      taskIds: TASKS.filter(t => t.module === 'js' || t.id.startsWith('js')).map(t => t.id),
    },
  ];
}
const MODULES = buildModules();

export class UIManager {
  constructor() {
    this.progress = JSON.parse(localStorage.getItem('shmyakdex_progress') || '{}');
    this.currentTask = null;
    this.currentModule = null;
    this.currentDialogLines = [];
    this.currentDialogIndex = 0;
    this.onCloseComputer = null;
    this._tipIndex = {};

    this._bindElements();
    this._bindEvents();
    this._updateHUD();
  }

  _bindElements() {
    // Dialog
    this.dialogOverlay   = document.getElementById('dialog-overlay');
    this.dialogAvatar    = document.getElementById('dialog-avatar');
    this.dialogSpeaker   = document.getElementById('dialog-speaker');
    this.dialogText      = document.getElementById('dialog-text');
    this.dialogNext      = document.getElementById('dialog-next');
    this.dialogTask      = document.getElementById('dialog-task');

    // Computer shell
    this.computerOverlay  = document.getElementById('computer-overlay');
    this.computerClose    = document.getElementById('computer-close');
    this.computerSettings = document.getElementById('computer-settings');
    this.settingsPanel    = document.getElementById('settings-panel');
    this.settingsClose    = document.getElementById('settings-close');
    this.settingsResetBtn = document.getElementById('settings-reset-btn');

    // Breadcrumb
    this.bcHome   = document.getElementById('bc-home');
    this.bcModule = document.getElementById('bc-module');
    this.bcTask   = document.getElementById('bc-task');
    this.bcSeps   = document.querySelectorAll('.bc-sep');

    // Screens
    this.screenHome   = document.getElementById('screen-home');
    this.screenKanban = document.getElementById('screen-kanban');
    this.screenEditor = document.getElementById('screen-editor');

    // Home
    this.homeDone   = document.getElementById('home-done');
    this.moduleGrid = document.getElementById('module-grid');

    // Kanban
    this.kanbanBack    = document.getElementById('kanban-back');
    this.kanbanTitle   = document.getElementById('kanban-title');
    this.kanbanMeta    = document.getElementById('kanban-meta');
    this.cardsTodo     = document.getElementById('cards-todo');
    this.cardsProgress = document.getElementById('cards-inprogress');
    this.cardsDone     = document.getElementById('cards-done');
    this.countTodo     = document.getElementById('count-todo');
    this.countProgress = document.getElementById('count-progress');
    this.countDone     = document.getElementById('count-done');

    // Editor
    this.editorBack       = document.getElementById('editor-back');
    this.editorTaskTitle  = document.getElementById('editor-task-title');
    this.taskContext      = document.getElementById('task-context');
    this.theoryHeader     = document.getElementById('theory-header');
    this.theoryBody       = document.getElementById('theory-body');
    this.taskDescription  = document.getElementById('task-description');
    this.codeEditor       = document.getElementById('code-editor');
    this.editorGutter     = document.getElementById('editor-gutter');
    this.editorFilename   = document.getElementById('editor-filename');
    this.previewFrame     = document.getElementById('preview-frame');
    this.runBtn           = document.getElementById('run-btn');
    this.checkBtn         = document.getElementById('check-btn');
    this.taskFeedback     = document.getElementById('task-feedback');
    this.feedbackIcon     = document.getElementById('feedback-icon');
    this.feedbackText     = document.getElementById('feedback-text');
    this.feedbackHint     = document.getElementById('feedback-hint');
    this.feedbackContinue = document.getElementById('feedback-continue');
    this.feedbackRetry    = document.getElementById('feedback-retry');

    // HUD
    this.interactPrompt = document.getElementById('interact-prompt');
    this.hudTasks       = document.getElementById('hud-tasks');
    this.hudHint        = document.getElementById('hud-hint');
    this.successToast   = document.getElementById('success-toast');
    this.toastContent   = document.getElementById('toast-content');
  }

  _bindEvents() {
    // Dialog
    this.dialogNext.addEventListener('click', () => this._nextDialogLine());
    this.dialogTask.addEventListener('click', () => {
      this._closeDialog();
      this.openComputer(this.currentTask);
    });

    // Close computer
    this.computerClose.addEventListener('click', () => {
      this._closeComputer();
      if (this.onCloseComputer) this.onCloseComputer();
    });

    // Settings
    this.computerSettings.addEventListener('click', () => this._openSettings());
    this.settingsClose.addEventListener('click', () => this._closeSettings());
    this.settingsResetBtn.addEventListener('click', () => this._showResetConfirm());

    // Breadcrumb
    this.bcHome.addEventListener('click', () => this._showScreen('home'));
    this.bcModule.addEventListener('click', () => {
      if (this.currentModule) this._showScreen('kanban');
    });

    // Kanban back
    this.kanbanBack.addEventListener('click', () => this._showScreen('home'));

    // Editor back
    this.editorBack.addEventListener('click', () => this._showScreen('kanban'));

    // Editor buttons
    this.runBtn.addEventListener('click', () => this._runPreview());
    this.checkBtn.addEventListener('click', () => this._checkTask());

    // Feedback
    this.feedbackRetry.addEventListener('click', () => {
      this.taskFeedback.classList.add('hidden');
    });
    this.feedbackContinue.addEventListener('click', () => {
      this.taskFeedback.classList.add('hidden');
      this._showScreen('kanban');
    });

    // Theory toggle
    this.theoryHeader.addEventListener('click', () => {
      this.theoryHeader.classList.toggle('open');
      this.theoryBody.classList.toggle('open');
    });

    // Tab in editor
    this.codeEditor.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const s = this.codeEditor.selectionStart;
        const v = this.codeEditor.value;
        this.codeEditor.value = v.substring(0, s) + '  ' + v.substring(this.codeEditor.selectionEnd);
        this.codeEditor.selectionStart = this.codeEditor.selectionEnd = s + 2;
        this._updateGutter();
      }
    });

    // Авто-обновление превью при вводе с дебаунсом 600ms
    this._previewDebounceTimer = null;
    this.codeEditor.addEventListener('input', () => {
      this._updateGutter();
      clearTimeout(this._previewDebounceTimer);
      this._previewDebounceTimer = setTimeout(() => this._runPreview(), 600);
    });

    this.codeEditor.addEventListener('scroll', () => {
      this.editorGutter.scrollTop = this.codeEditor.scrollTop;
    });  }

  // ── Screen routing ────────────────────────────────────────

  _showScreen(name) {
    this.screenHome.classList.toggle('hidden', name !== 'home');
    this.screenKanban.classList.toggle('hidden', name !== 'kanban');
    this.screenEditor.classList.toggle('hidden', name !== 'editor');

    const sep1 = this.bcSeps[0];
    const sep2 = this.bcSeps[1];

    if (name === 'home') {
      this.bcHome.classList.add('bc-active');
      this.bcModule.classList.add('hidden');
      this.bcTask.classList.add('hidden');
      sep1 && sep1.classList.add('hidden');
      sep2 && sep2.classList.add('hidden');
    } else if (name === 'kanban') {
      this.bcHome.classList.remove('bc-active');
      this.bcModule.classList.remove('hidden');
      this.bcModule.classList.add('bc-active');
      this.bcTask.classList.add('hidden');
      sep1 && sep1.classList.remove('hidden');
      sep2 && sep2.classList.add('hidden');
      this._renderKanban();
    } else if (name === 'editor') {
      this.bcHome.classList.remove('bc-active');
      this.bcModule.classList.remove('hidden');
      this.bcModule.classList.remove('bc-active');
      this.bcTask.classList.remove('hidden');
      this.bcTask.classList.add('bc-active');
      sep1 && sep1.classList.remove('hidden');
      sep2 && sep2.classList.remove('hidden');
    }
  }

  // ── Home screen ───────────────────────────────────────────

  _renderHome() {
    const done = TASKS.filter(t => this.progress[t.id]).length;
    if (this.homeDone) this.homeDone.textContent = `${done}/${TASKS.length}`;

    this.moduleGrid.innerHTML = '';
    MODULES.forEach(mod => {
      const modTasks = TASKS.filter(t => mod.taskIds.includes(t.id));
      const modDone  = modTasks.filter(t => this.progress[t.id]).length;
      const pct = modTasks.length ? Math.round(modDone / modTasks.length * 100) : 0;

      const card = document.createElement('div');
      card.className = `module-card ${mod.color}`;
      card.innerHTML = `
        <span class="module-icon">${mod.icon}</span>
        <div class="module-name">${mod.name}</div>
        <div class="module-desc">${mod.desc}</div>
        <div class="module-progress-bar">
          <div class="module-progress-fill" style="width:${pct}%"></div>
        </div>
        <div class="module-progress-text">
          <span>${modDone}/${modTasks.length} заданий</span>
          <span>${pct}%</span>
        </div>
      `;
      card.addEventListener('click', () => {
        this.currentModule = mod;
        this.bcModule.textContent = `${mod.icon} ${mod.name}`;
        this._showScreen('kanban');
      });
      this.moduleGrid.appendChild(card);
    });
  }

  // ── Kanban screen ─────────────────────────────────────────

  _renderKanban() {
    if (!this.currentModule) return;
    const mod = this.currentModule;
    const modTasks = TASKS.filter(t => mod.taskIds.includes(t.id));
    const done = modTasks.filter(t => this.progress[t.id]).length;

    this.kanbanTitle.textContent = `${mod.icon} ${mod.name}`;
    this.kanbanMeta.textContent  = `${done}/${modTasks.length} выполнено`;

    this.cardsTodo.innerHTML = '';
    this.cardsProgress.innerHTML = '';
    this.cardsDone.innerHTML = '';

    let nTodo = 0, nProgress = 0, nDone = 0;

    modTasks.forEach(task => {
      const isDone = !!this.progress[task.id];
      const isActive = this.currentTask && this.currentTask.id === task.id && !isDone;
      const card = this._makeTaskCard(task, isDone);

      if (isDone) {
        this.cardsDone.appendChild(card);
        nDone++;
      } else if (isActive) {
        this.cardsProgress.appendChild(card);
        nProgress++;
      } else {
        this.cardsTodo.appendChild(card);
        nTodo++;
      }
    });

    this.countTodo.textContent     = nTodo;
    this.countProgress.textContent = nProgress;
    this.countDone.textContent     = nDone;
  }

  _makeTaskCard(task, isDone) {
    const tagClass = task.id.startsWith('css') ? 'tag-css' : task.id.startsWith('js') ? 'tag-js' : 'tag-html';
    const tagLabel = task.id.startsWith('css') ? 'CSS' : task.id.startsWith('js') ? 'JS' : 'HTML';

    const card = document.createElement('div');
    card.className = `task-card${isDone ? ' is-done' : ''}`;
    card.innerHTML = `
      <span class="task-card-tag ${tagClass}">${tagLabel}</span>
      <div class="task-card-title">${task.title}</div>
      <div class="task-card-footer">
        ${isDone
          ? '<span class="task-card-status">✅ Выполнено</span>'
          : `<button class="task-card-open-btn">Открыть →</button>`
        }
      </div>
    `;
    if (!isDone) {
      card.querySelector('.task-card-open-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        this._openEditor(task);
      });
      card.addEventListener('click', () => this._openEditor(task));
    }
    return card;
  }

  // ── Editor screen ─────────────────────────────────────────

  _openEditor(task) {
    this.currentTask = task;
    this._lastOpenedTask = task;
    this.bcTask.textContent = task.title;

    this.editorTaskTitle.textContent   = task.title;
    this.taskContext.innerHTML         = task.context;
    this.theoryBody.innerHTML          = task.theory;
    this.taskDescription.innerHTML     = task.description;

    this.theoryHeader.classList.remove('open');
    this.theoryBody.classList.remove('open');

    const saved = this.progress[task.id + '_code'];
    this.codeEditor.value = saved || task.starterCode;
    this._updateGutter();

    if (this.editorFilename) {
      this.editorFilename.textContent = task.id.startsWith('css') ? 'style.css'
        : task.id.startsWith('js') ? 'script.js' : 'index.html';
    }

    this.taskFeedback.classList.add('hidden');
    this._showScreen('editor');
    // Запускаем превью после того как iframe стал видимым
    requestAnimationFrame(() => this._runPreview());
  }

  // ── Public: open computer ─────────────────────────────────

  openComputer(task) {
    this.computerOverlay.classList.remove('hidden');
    this._renderHome();

    if (task) {
      const mod = MODULES.find(m => m.taskIds.includes(task.id));
      if (mod) {
        this.currentModule = mod;
        this.bcModule.textContent = `${mod.icon} ${mod.name}`;
        this._openEditor(task);
        return;
      }
    }
    this._showScreen('home');
  }

  _openComputer(task) { this.openComputer(task); }

  _closeComputer() {
    this.computerOverlay.classList.add('hidden');
    if (this.currentTask) {
      this.progress[this.currentTask.id + '_code'] = this.codeEditor.value;
      this._saveProgress();
    }
  }

  // ── Editor logic ──────────────────────────────────────────

  _updateGutter() {
    const lines = this.codeEditor.value.split('\n').length;
    this.editorGutter.textContent = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
  }

  _runPreview() {
    const code = this.codeEditor.value;
    const task = this.currentTask;

    let html;

    if (task && task.id.startsWith('css')) {
      // CSS-задание: извлекаем <style> и HTML отдельно
      const styleMatch = code.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
      const styleContent = styleMatch ? styleMatch[1] : '';
      // Убираем теги style и script из кода, оставляем только HTML
      const bodyContent = code
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<!--[^>]*не меняй[^>]*-->/gi, '')
        .trim();
      html = `<!DOCTYPE html><html><head>
<meta charset="utf-8">
<style>
  body { font-family: system-ui, sans-serif; padding: 24px; background: #f8f9fa; }
</style>
<style>${styleContent}</style>
</head><body>${bodyContent}</body></html>`;

    } else if (task && task.id.startsWith('js')) {
      // JS-задание: извлекаем <script> и HTML отдельно
      const scriptMatch = code.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
      const scriptContent = scriptMatch ? scriptMatch[1] : '';
      const bodyContent = code
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<!--[^>]*не меняй[^>]*-->/gi, '')
        .trim();
      html = `<!DOCTYPE html><html><head>
<meta charset="utf-8">
<style>
  body { font-family: system-ui, sans-serif; padding: 24px; background: #f8f9fa; }
  button { cursor: pointer; padding: 8px 16px; font-size: 15px; }
</style>
</head><body>${bodyContent}
<script>${scriptContent}<\/script>
</body></html>`;

    } else {
      // HTML-задание: рендерим код как есть
      html = `<!DOCTYPE html><html><head>
<meta charset="utf-8">
<style>
  body { font-family: system-ui, sans-serif; padding: 24px; background: #f8f9fa; margin: 0; }
  h1, h2, h3 { color: #1a2a3a; }
  a { color: #3b82f6; }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
  th { background: #e8f0fe; }
  input, textarea, button { font-family: inherit; font-size: 14px; padding: 6px 10px; margin: 4px 0; }
  .card { border: 1px solid #ddd; border-radius: 8px; padding: 16px; max-width: 300px; background: #fff; }
</style>
</head><body>${code}</body></html>`;
    }

    // Сбрасываем srcdoc через пустую строку чтобы гарантировать перерисовку
    this.previewFrame.srcdoc = '';
    // Используем setTimeout чтобы браузер успел сбросить состояние
    setTimeout(() => { this.previewFrame.srcdoc = html; }, 0);
  }

  _checkTask() {
    const code = this.codeEditor.value;
    const result = this.currentTask.check(code);
    this.taskFeedback.classList.remove('hidden');

    if (result.ok) {
      this.feedbackIcon.textContent = '🎉';
      this.feedbackText.textContent = `Отлично! ${this.currentTask.reward}`;
      this.feedbackHint.classList.add('hidden');
      this.feedbackContinue.classList.remove('hidden');
      this.feedbackRetry.style.display = 'none';

      if (!this.progress[this.currentTask.id]) {
        this.progress[this.currentTask.id] = true;
        this._saveProgress();
        this._updateHUD();
        setTimeout(() => this._showToast(this.currentTask.reward), 300);
      }
    } else {
      this.feedbackIcon.textContent = '🤔';
      this.feedbackText.textContent = 'Почти! Есть небольшая ошибка.';
      this.feedbackHint.innerHTML = '💡 Подсказка: ' + result.hint;
      this.feedbackHint.classList.remove('hidden');
      this.feedbackContinue.classList.add('hidden');
      this.feedbackRetry.style.display = '';
    }
  }

  // ── Dialog ────────────────────────────────────────────────

  showDialog(npcId, lines, taskId = null) {
    const npc = NPC_DATA[npcId] || NPC_DATA.boss;
    if (npc.avatar) {
      this.dialogAvatar.style.background = npc.color;
      this.dialogAvatar.innerHTML = `<img src="${npc.avatar}" alt="${npc.name}" class="dialog-avatar-img">`;
    } else {
      this.dialogAvatar.innerHTML = npc.emoji;
      this.dialogAvatar.style.background = npc.color;
    }
    this.dialogSpeaker.textContent = npc.name;

    this.currentDialogLines = lines;
    this.currentDialogIndex = 0;
    if (taskId !== null) {
      this.currentTask = TASKS.find(t => t.id === taskId) || null;
    }

    this._showDialogLine();
    this.dialogOverlay.classList.remove('hidden');
  }

  _showDialogLine() {
    const line = this.currentDialogLines[this.currentDialogIndex];
    this.dialogText.innerHTML = line;
    const isLast = this.currentDialogIndex === this.currentDialogLines.length - 1;
    this.dialogNext.classList.toggle('hidden', isLast && !!this.currentTask);
    this.dialogTask.classList.toggle('hidden', !isLast || !this.currentTask);
  }

  _nextDialogLine() {
    this.currentDialogIndex++;
    if (this.currentDialogIndex < this.currentDialogLines.length) {
      this._showDialogLine();
    } else {
      this._closeDialog();
    }
  }

  _closeDialog() {
    this.dialogOverlay.classList.add('hidden');
  }

  // ── HUD ───────────────────────────────────────────────────

  _updateHUD() {
    const done = TASKS.filter(t => this.progress[t.id]).length;
    this.hudTasks.textContent = `${done}/${TASKS.length}`;
  }

  _saveProgress() {
    localStorage.setItem('shmyakdex_progress', JSON.stringify(this.progress));
  }

  // ── Settings ──────────────────────────────────────────────

  _openSettings() {
    this.settingsPanel.classList.remove('hidden');
    const old = this.settingsPanel.querySelector('.settings-confirm');
    if (old) old.remove();
  }

  _closeSettings() {
    this.settingsPanel.classList.add('hidden');
  }

  _showResetConfirm() {
    if (this.settingsPanel.querySelector('.settings-confirm')) return;
    const confirm = document.createElement('div');
    confirm.className = 'settings-confirm';
    confirm.innerHTML = `
      <div class="settings-confirm-text">Уверен? Весь прогресс будет удалён безвозвратно.</div>
      <div class="settings-confirm-btns">
        <button class="settings-btn-cancel">Отмена</button>
        <button class="settings-btn-confirm">Да, сбросить</button>
      </div>
    `;
    this.settingsPanel.querySelector('#settings-body').appendChild(confirm);
    confirm.querySelector('.settings-btn-cancel').addEventListener('click', () => confirm.remove());
    confirm.querySelector('.settings-btn-confirm').addEventListener('click', () => this._resetGame());
  }

  _resetGame() {
    localStorage.removeItem('shmyakdex_progress');
    localStorage.removeItem('shmyakdex_onboarding_done');
    localStorage.removeItem('shmyakdex_player_name');
    location.reload();
  }

  // ── Public helpers ────────────────────────────────────────

  isTaskDone(taskId) { return !!this.progress[taskId]; }

  getActiveTask() {
    return this.currentTask && !this.progress[this.currentTask.id]
      ? this.currentTask
      : null;
  }

  getLastOpenedTask() {
    return this._lastOpenedTask || null;
  }

  showColleagueTip(npcId) {
    const activeTask = this.getActiveTask();

    if (!activeTask) {
      const allDone = TASKS.every(t => this.progress[t.id]);
      if (allDone) {
        this.showDialog(npcId, ['Ты уже всё сделал! Поздравляю, настоящий джун! 🎉']);
      } else {
        this.showDialog(npcId, ['Сначала возьми задачу у Артёма и открой её на компьютере — тогда смогу помочь!']);
      }
      return;
    }

    if (this.progress[activeTask.id]) {
      this.showDialog(npcId, [`Задание «${activeTask.title}» уже выполнено. Отличная работа! 👍`]);
      return;
    }

    const tips = activeTask.colleagueTips;
    if (!tips) {
      this.showDialog(npcId, ['Хм, по этому заданию у меня пока нет подсказок. Попробуй сам!']);
      return;
    }

    const tipSet = tips.find(t => t.npc === npcId);
    if (!tipSet) {
      this.showDialog(npcId, ['По этому заданию у меня нет подсказок, спроси у другого коллеги!']);
      return;
    }

    const key = `${activeTask.id}_${npcId}`;
    const idx = this._tipIndex[key] || 0;
    this._tipIndex[key] = (idx + 1) % 1;
    this.showDialog(npcId, tipSet.lines);
  }

  showInteractPrompt(show) {
    this.interactPrompt.classList.toggle('hidden', !show);
  }

  setHint(text) { this.hudHint.textContent = text; }

  _showToast(msg) {
    this.toastContent.textContent = msg;
    this.successToast.classList.remove('hidden');
    setTimeout(() => this.successToast.classList.add('hidden'), 3500);
  }

  isAnyUIOpen() {
    return !this.dialogOverlay.classList.contains('hidden') ||
           !this.computerOverlay.classList.contains('hidden');
  }
}

// ── NPC data ──────────────────────────────────────────────────
const NPC_DATA = {
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

// ── NPC Dialog scripts ────────────────────────────────────────
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
