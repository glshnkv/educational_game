import { STORAGE_KEYS } from '../core/constants.js';

export function openSettings(ui) {
  ui.settingsPanel.classList.remove('hidden');
  const old = ui.settingsPanel.querySelector('.settings-confirm');
  if (old) old.remove();
}

export function closeSettings(ui) {
  ui.settingsPanel.classList.add('hidden');
}

export function showResetConfirm(ui) {
  if (ui.settingsPanel.querySelector('.settings-confirm')) return;

  const confirm = document.createElement('div');
  confirm.className = 'settings-confirm';
  confirm.innerHTML = `
    <div class="settings-confirm-text">Уверен? Весь прогресс будет удалён безвозвратно.</div>
    <div class="settings-confirm-btns">
      <button class="settings-btn-cancel">Отмена</button>
      <button class="settings-btn-confirm">Да, сбросить</button>
    </div>
  `;
  ui.settingsPanel.querySelector('#settings-body').appendChild(confirm);
  confirm.querySelector('.settings-btn-cancel').addEventListener('click', () => confirm.remove());
  confirm.querySelector('.settings-btn-confirm').addEventListener('click', () => resetGame());
}

export function resetGame() {
  localStorage.removeItem(STORAGE_KEYS.progress);
  localStorage.removeItem(STORAGE_KEYS.onboardingDone);
  localStorage.removeItem(STORAGE_KEYS.playerName);
  location.reload();
}
