// ============================================================
// ONBOARDING — Первый рабочий день в Шмякдекс
// Пошаговый туториал: диалоги + подсветка UI
// ============================================================

const ONBOARDING_KEY = 'shmyakdex_onboarding_done';

// ── Шаги онбординга ──────────────────────────────────────────
// type: 'dialog'   — диалог с персонажем
// type: 'highlight' — подсветка элемента компьютера (открывает компьютер)
// type: 'info'     — информационная карточка без персонажа

const STEPS = [
  // ── Блок 1: Встреча с тимлидом ──
  {
    type: 'dialog',
    npc: { name: 'Артём (Тимлид)', emoji: '👨‍💼', avatar: 'assets/images/artem-avatar.png', color: 'linear-gradient(135deg, #1e40af, #7c3aed)' },
    text: 'Привет! Добро пожаловать в Шмякдекс. Я Артём, твой тимлид. Сегодня твой первый рабочий день — давай введу тебя в курс дела.',
  },
  {
    type: 'dialog',
    npc: { name: 'Артём (Тимлид)', emoji: '👨‍💼', avatar: 'assets/images/artem-avatar.png', color: 'linear-gradient(135deg, #1e40af, #7c3aed)' },
    text: 'Это наш офис. Здесь работают Маша — дизайнер, и Саша — разработчик. Они помогут тебе с заданиями, если застрянешь.',
  },
  {
    type: 'dialog',
    npc: { name: 'Артём (Тимлид)', emoji: '👨‍💼', avatar: 'assets/images/artem-avatar.png', color: 'linear-gradient(135deg, #1e40af, #7c3aed)' },
    text: 'Передвигаться по офису можно клавишами WASD или стрелками. Когда подойдёшь к кому-то — нажми E для взаимодействия.',
  },
  {
    type: 'dialog',
    npc: { name: 'Артём (Тимлид)', emoji: '👨‍💼', avatar: 'assets/images/artem-avatar.png', color: 'linear-gradient(135deg, #1e40af, #7c3aed)' },
    text: 'Твоё рабочее место — стол с красной кружкой в центре офиса. Там стоит твой компьютер. Именно через него ты будешь выполнять задания.',
  },
  {
    type: 'dialog',
    npc: { name: 'Артём (Тимлид)', emoji: '👨‍💼', avatar: 'assets/images/artem-avatar.png', color: 'linear-gradient(135deg, #1e40af, #7c3aed)' },
    text: 'Давай я покажу тебе, как работает компьютер. Сейчас открою его для тебя.',
    openComputer: true,
  },
  // ── Блок 2: Компьютер — главный экран ──
  {
    type: 'highlight',
    target: 'screen-home',
    npc: { name: 'Артём (Тимлид)', emoji: '👨‍💼', avatar: 'assets/images/artem-avatar.png', color: 'linear-gradient(135deg, #1e40af, #7c3aed)' },
    text: 'Это главный экран твоего рабочего места — Шмякдекс. Здесь видны твои прогресс по заданиям.',
    highlight: '#home-hero',
  },
  {
    type: 'highlight',
    target: 'screen-home',
    npc: { name: 'Артём (Тимлид)', emoji: '👨‍💼', avatar: 'assets/images/artem-avatar.png', color: 'linear-gradient(135deg, #1e40af, #7c3aed)' },
    text: 'Задания разбиты по модулям: HTML, CSS и JavaScript. Каждый модуль — это набор практических задач. Кликай на карточку, чтобы открыть модуль.',
    highlight: '#module-grid',
  },
  // ── Блок 3: Канбан ──
  {
    type: 'highlight',
    target: 'screen-kanban',
    npc: { name: 'Артём (Тимлид)', emoji: '👨‍💼', avatar: 'assets/images/artem-avatar.png', color: 'linear-gradient(135deg, #1e40af, #7c3aed)' },
    text: 'Внутри модуля — канбан-доска. Задания делятся на три колонки: «К выполнению», «В работе» и «Выполнено». Всё как в настоящей команде.',
    highlight: '#kanban-board',
    navigateTo: 'kanban',
  },
  {
    type: 'highlight',
    target: 'screen-kanban',
    npc: { name: 'Артём (Тимлид)', emoji: '👨‍💼', avatar: 'assets/images/artem-avatar.png', color: 'linear-gradient(135deg, #1e40af, #7c3aed)' },
    text: 'Нажми на карточку задания или кнопку «Открыть →», чтобы перейти к редактору кода.',
    highlight: '#col-todo',
  },
  // ── Блок 4: Редактор ──
  {
    type: 'highlight',
    target: 'screen-editor',
    npc: { name: 'Артём (Тимлид)', emoji: '👨‍💼', avatar: 'assets/images/artem-avatar.png', color: 'linear-gradient(135deg, #1e40af, #7c3aed)' },
    text: 'Это редактор кода. Слева — описание задачи и теория, справа — редактор и превью результата.',
    highlight: '#computer-workspace',
    navigateTo: 'editor',
  },
  {
    type: 'highlight',
    target: 'screen-editor',
    npc: { name: 'Артём (Тимлид)', emoji: '👨‍💼', avatar: 'assets/images/artem-avatar.png', color: 'linear-gradient(135deg, #1e40af, #7c3aed)' },
    text: 'Пиши код здесь. Tab вставляет отступ. Код сохраняется автоматически — можешь закрыть и вернуться позже.',
    highlight: '#editor-gutter-wrap',
  },
  {
    type: 'highlight',
    target: 'screen-editor',
    npc: { name: 'Артём (Тимлид)', emoji: '👨‍💼', avatar: 'assets/images/artem-avatar.png', color: 'linear-gradient(135deg, #1e40af, #7c3aed)' },
    text: '«Запустить» — показывает результат в превью справа. «Проверить» — проверяет правильность кода и даёт обратную связь.',
    highlight: '#editor-actions',
  },
  {
    type: 'highlight',
    target: 'screen-editor',
    npc: { name: 'Маша (Дизайнер)', emoji: '👩‍🎨', avatar: 'assets/images/masha-avatar.png', color: 'linear-gradient(135deg, #be185d, #9333ea)' },
    text: 'Привет! Я Маша. Если застрянешь — подойди ко мне или Саше в офисе, нажми E. Мы дадим подсказку по активному заданию.',
    highlight: null,
  },
  // ── Блок 5: Финал ──
  {
    type: 'dialog',
    npc: { name: 'Артём (Тимлид)', emoji: '👨‍💼', avatar: 'assets/images/artem-avatar.png', color: 'linear-gradient(135deg, #1e40af, #7c3aed)' },
    text: 'Вот и всё! Закрой компьютер крестиком, подойди к боссу и получи первое задание. Удачи, джун! 🚀',
    closeComputer: true,
  },
];

// ── Onboarding Manager ────────────────────────────────────────
export class OnboardingManager {
  constructor(ui) {
    this.ui = ui;
    this.step = 0;
    this.active = false;
    this._overlay = null;
    this._card = null;
    this._highlightBox = null;
    this._onDone = null;
  }

  isCompleted() {
    return !!localStorage.getItem(ONBOARDING_KEY);
  }

  start(onDone) {
    if (this.isCompleted()) {
      onDone && onDone();
      return;
    }
    this._onDone = onDone;
    this.active = true;
    window.__onboarding_active = true;
    this.step = 0;
    this._buildOverlay();
    this._showStep();
  }

  _buildOverlay() {
    // Dim overlay
    this._overlay = document.createElement('div');
    this._overlay.id = 'ob-overlay';
    document.body.appendChild(this._overlay);

    // Highlight box (animated border)
    this._highlightBox = document.createElement('div');
    this._highlightBox.id = 'ob-highlight';
    document.body.appendChild(this._highlightBox);

    // Dialog card
    this._card = document.createElement('div');
    this._card.id = 'ob-card';
    document.body.appendChild(this._card);
  }

  _showStep() {
    const step = STEPS[this.step];
    if (!step) { this._finish(); return; }

    // Handle special actions
    if (step.openComputer) {
      this.ui.openComputer(null);
      // Small delay to let animation play
      setTimeout(() => this._renderCard(step), 320);
      return;
    }
    if (step.closeComputer) {
      this._renderCard(step);
      return;
    }

    // Navigate inside computer if needed
    if (step.navigateTo) {
      this._navigateComputer(step.navigateTo);
    }

    // Highlight target element
    if (step.highlight) {
      setTimeout(() => this._applyHighlight(step.highlight), 80);
    } else {
      this._clearHighlight();
    }

    this._renderCard(step);
  }

  _navigateComputer(screen) {
    const ui = this.ui;
    if (screen === 'kanban') {
      // Open HTML module kanban
      const mod = { id: 'html', name: 'HTML', icon: '🌐', taskIds: ['html-card'] };
      ui.currentModule = mod;
      const bcModule = document.getElementById('bc-module');
      if (bcModule) bcModule.textContent = `${mod.icon} ${mod.name}`;
      ui._showScreen('kanban');
    } else if (screen === 'editor') {
      // Open first task in editor via openComputer to ensure proper state
      const tasks = window.__shmyakdex_tasks?.TASKS;
      if (tasks && tasks[0]) {
        ui._openEditor(tasks[0]);
      }
    }
  }

  _applyHighlight(selector) {
    const el = document.querySelector(selector);
    if (!el) { this._clearHighlight(); return; }

    const rect = el.getBoundingClientRect();
    const pad = 6;
    this._highlightBox.style.cssText = `
      left:   ${rect.left   - pad}px;
      top:    ${rect.top    - pad}px;
      width:  ${rect.width  + pad * 2}px;
      height: ${rect.height + pad * 2}px;
      opacity: 1;
    `;
  }

  _clearHighlight() {
    if (this._highlightBox) this._highlightBox.style.opacity = '0';
  }

  _renderCard(step) {
    const isLast = this.step === STEPS.length - 1;
    const progress = `${this.step + 1} / ${STEPS.length}`;

    this._card.innerHTML = `
      <div class="ob-npc">
        <div class="ob-avatar" style="background:${step.npc.color}">
          ${step.npc.avatar
            ? `<img src="${step.npc.avatar}" alt="${step.npc.name}" class="ob-avatar-img">`
            : step.npc.emoji}
        </div>
        <div class="ob-speaker">${step.npc.name}</div>
      </div>
      <div class="ob-text">${step.text}</div>
      <div class="ob-footer">
        <div class="ob-progress">
          <div class="ob-progress-bar">
            <div class="ob-progress-fill" style="width:${((this.step + 1) / STEPS.length) * 100}%"></div>
          </div>
          <span class="ob-progress-label">${progress}</span>
        </div>
        <div class="ob-actions">
          ${this.step > 0 ? '<button class="ob-btn ob-btn-back">← Назад</button>' : ''}
          <button class="ob-btn ob-btn-skip">Пропустить</button>
          <button class="ob-btn ob-btn-next">${isLast ? 'Начать работу 🚀' : 'Далее →'}</button>
        </div>
      </div>
    `;

    // Animate in
    this._card.classList.remove('ob-card-in');
    void this._card.offsetWidth;
    this._card.classList.add('ob-card-in');

    this._card.querySelector('.ob-btn-next').addEventListener('click', () => this._next());
    this._card.querySelector('.ob-btn-skip').addEventListener('click', () => this._finish());
    const backBtn = this._card.querySelector('.ob-btn-back');
    if (backBtn) backBtn.addEventListener('click', () => this._prev());
  }

  _next() {
    const step = STEPS[this.step];
    // Close computer on last step
    if (step.closeComputer) {
      const closeBtn = document.getElementById('computer-close');
      if (closeBtn) closeBtn.click();
    }
    this.step++;
    this._clearHighlight();
    this._showStep();
  }

  _prev() {
    if (this.step > 0) {
      this.step--;
      this._clearHighlight();
      this._showStep();
    }
  }

  _finish() {
    localStorage.setItem(ONBOARDING_KEY, '1');
    this.active = false;
    window.__onboarding_active = false;

    // Close computer if open
    const compOverlay = document.getElementById('computer-overlay');
    if (compOverlay && !compOverlay.classList.contains('hidden')) {
      const closeBtn = document.getElementById('computer-close');
      if (closeBtn) closeBtn.click();
    }

    // Fade out and remove
    if (this._overlay) {
      this._overlay.style.opacity = '0';
      this._card.style.opacity = '0';
      this._card.style.transform = 'translateY(20px)';
      this._highlightBox.style.opacity = '0';
      setTimeout(() => {
        this._overlay?.remove();
        this._card?.remove();
        this._highlightBox?.remove();
        this._overlay = null;
        this._card = null;
        this._highlightBox = null;
      }, 350);
    }

    this._onDone && this._onDone();
  }
}
