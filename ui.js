// ============================================================
// UI MANAGER — 3-screen computer flow
// ============================================================
import { TASKS } from './tasks.js';
import { STORAGE_KEYS } from './core/constants.js';
import { NPC_DIALOGS } from './data/npc-data.js';
import { ProgressStore } from './core/progress-store.js';
import { buildModules } from './ui_parts/modules.js';
import { renderHome, renderKanban, makeTaskCard } from './ui_parts/kanban.js';
import { openEditor, updateGutter, runPreview, checkTask } from './ui_parts/editor.js';
import { showDialog, showDialogLine, nextDialogLine, closeDialog } from './ui_parts/dialog.js';
import { openSettings, closeSettings, showResetConfirm, resetGame } from './ui_parts/settings.js';

const MODULES = buildModules();

export class UIManager {
  constructor() {
    this.progressStore = new ProgressStore(STORAGE_KEYS.progress);
    this.progress = this.progressStore.state;
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
    return renderHome(this, MODULES);
  }

  // ── Kanban screen ─────────────────────────────────────────

  _renderKanban() {
    return renderKanban(this);
  }

  _makeTaskCard(task, isDone) {
    return makeTaskCard(this, task, isDone);
  }

  // ── Editor screen ─────────────────────────────────────────

  _openEditor(task) {
    return openEditor(this, task);
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
      this.progressStore.setTaskCode(this.currentTask.id, this.codeEditor.value);
    }
  }

  // ── Editor logic ──────────────────────────────────────────

  _updateGutter() {
    return updateGutter(this);
  }

  _runPreview() {
    return runPreview(this);
  }

  _checkTask() {
    return checkTask(this);
  }

  // ── Dialog ────────────────────────────────────────────────

  showDialog(npcId, lines, taskId = null) {
    return showDialog(this, npcId, lines, taskId);
  }

  _showDialogLine() {
    return showDialogLine(this);
  }

  _nextDialogLine() {
    return nextDialogLine(this);
  }

  _closeDialog() {
    return closeDialog(this);
  }

  // ── HUD ───────────────────────────────────────────────────

  _updateHUD() {
    const done = TASKS.filter(t => this.progress[t.id]).length;
    this.hudTasks.textContent = `${done}/${TASKS.length}`;
  }

  _saveProgress() {
    this.progressStore.save();
  }

  // ── Settings ──────────────────────────────────────────────

  _openSettings() {
    return openSettings(this);
  }

  _closeSettings() {
    return closeSettings(this);
  }

  _showResetConfirm() {
    return showResetConfirm(this);
  }

  _resetGame() {
    return resetGame();
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

  getModuleById(moduleId) {
    return MODULES.find((mod) => mod.id === moduleId) || null;
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
    this._tipIndex[key] = (idx + 1) % tipSet.lines.length;
    this.showDialog(npcId, [tipSet.lines[idx]]);
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
export { NPC_DIALOGS };
