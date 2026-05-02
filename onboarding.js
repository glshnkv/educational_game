// ============================================================
// ONBOARDING — Первый рабочий день в Кодликс
// ============================================================
import { STORAGE_KEYS } from './core/constants.js';
import { sanitizeHTML } from './core/sanitize.js';
import { buildOnboardingSteps } from './data/onboarding-steps.js';

export class OnboardingManager {
  constructor(ui, tasks) {
    this.ui = ui;
    this.tasks = tasks;
    this.steps = buildOnboardingSteps();
    this.step = 0;
    this.active = false;
    this._overlay = null;
    this._card = null;
    this._highlightBox = null;
    this._onDone = null;
  }

  isCompleted() {
    return !!localStorage.getItem(STORAGE_KEYS.onboardingDone);
  }

  isActive() {
    return this.active;
  }

  start(onDone) {
    if (this.isCompleted()) {
      onDone && onDone();
      return;
    }

    this._onDone = onDone;
    this.active = true;
    this.step = 0;
    this._buildOverlay();
    this._showStep();
  }

  _buildOverlay() {
    this._overlay = document.createElement('div');
    this._overlay.id = 'ob-overlay';
    document.body.appendChild(this._overlay);

    this._highlightBox = document.createElement('div');
    this._highlightBox.id = 'ob-highlight';
    document.body.appendChild(this._highlightBox);

    this._card = document.createElement('div');
    this._card.id = 'ob-card';
    document.body.appendChild(this._card);
  }

  _showStep() {
    const step = this.steps[this.step];
    if (!step) {
      this._finish();
      return;
    }

    if (step.openComputer) {
      this.ui.openComputer(null);
      setTimeout(() => this._renderCard(step), 320);
      return;
    }

    if (step.navigateTo) {
      this._navigateComputer(step.navigateTo);
    }
    if (step.taskFlowStep) {
      this.ui._showTaskFlowStep(step.taskFlowStep, step.taskFlowOptions || {});
    }

    if (step.highlight) {
      setTimeout(() => this._applyHighlight(step.highlight), 80);
    } else {
      this._clearHighlight();
    }

    this._renderCard(step);
  }

  _navigateComputer(screen) {
    if (screen === 'kanban') {
      const htmlModule = this.ui.getModuleById('html');
      if (!htmlModule) return;
      this.ui.currentModule = htmlModule;
      const bcModule = document.getElementById('bc-module');
      if (bcModule) bcModule.textContent = `${htmlModule.icon} ${htmlModule.name}`;
      this.ui._showScreen('kanban');
      return;
    }

    if (screen === 'editor') {
      const firstTask = this.tasks[0];
      if (firstTask) this.ui._openEditor(firstTask);
    }
  }

  _applyHighlight(selector) {
    const el = document.querySelector(selector);
    if (!el) {
      this._clearHighlight();
      return;
    }

    const rect = el.getBoundingClientRect();
    const pad = 6;
    this._highlightBox.style.cssText = `
      left: ${rect.left - pad}px;
      top: ${rect.top - pad}px;
      width: ${rect.width + pad * 2}px;
      height: ${rect.height + pad * 2}px;
      opacity: 1;
    `;
  }

  _clearHighlight() {
    if (this._highlightBox) this._highlightBox.style.opacity = '0';
  }

  _renderCard(step) {
    const isLast = this.step === this.steps.length - 1;
    const progress = `${this.step + 1} / ${this.steps.length}`;
    const safeText = sanitizeHTML(step.text);
    const safeNpcName = sanitizeHTML(step.npc.name);
    const safeAvatarSrc = step.npc.avatar ? step.npc.avatar.replace(/"/g, '') : '';

    this._card.innerHTML = `
      <div class="ob-npc">
        <div class="ob-avatar" style="background:${step.npc.color}">
          ${step.npc.avatar
            ? `<img src="${safeAvatarSrc}" alt="${safeNpcName}" class="ob-avatar-img">`
            : step.npc.emoji}
        </div>
        <div class="ob-speaker">${safeNpcName}</div>
      </div>
      <div class="ob-text">${safeText}</div>
      <div class="ob-footer">
        <div class="ob-progress">
          <div class="ob-progress-bar">
            <div class="ob-progress-fill" style="width:${((this.step + 1) / this.steps.length) * 100}%"></div>
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

    this._card.classList.remove('ob-card-in');
    void this._card.offsetWidth;
    this._card.classList.add('ob-card-in');

    this._card.querySelector('.ob-btn-next').addEventListener('click', () => this._next());
    this._card.querySelector('.ob-btn-skip').addEventListener('click', () => this._finish());
    const backBtn = this._card.querySelector('.ob-btn-back');
    if (backBtn) backBtn.addEventListener('click', () => this._prev());
  }

  _next() {
    const step = this.steps[this.step];
    if (step.closeComputer) {
      const closeBtn = document.getElementById('computer-close');
      if (closeBtn) closeBtn.click();
    }
    this.step++;
    this._clearHighlight();
    this._showStep();
  }

  _prev() {
    if (this.step <= 0) return;
    this.step--;
    this._clearHighlight();
    this._showStep();
  }

  _finish() {
    localStorage.setItem(STORAGE_KEYS.onboardingDone, '1');
    this.active = false;

    const compOverlay = document.getElementById('computer-overlay');
    if (compOverlay && !compOverlay.classList.contains('hidden')) {
      const closeBtn = document.getElementById('computer-close');
      if (closeBtn) closeBtn.click();
    }

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
