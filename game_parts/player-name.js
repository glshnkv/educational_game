import { loadString } from '../core/storage.js';

export function getPlayerName(storageKey) {
  return loadString(storageKey, 'Игрок');
}

export function applyPlayerName(name) {
  const hudName = document.getElementById('hud-player-name');
  if (hudName) hudName.textContent = name;

  const homeTitle = document.getElementById('home-title');
  if (homeTitle) homeTitle.textContent = `Добро пожаловать, ${name}!`;
}

export function showNameScreen(storageKey, onDone) {
  const screen = document.getElementById('name-screen');
  const input = document.getElementById('name-input');
  const submit = document.getElementById('name-submit');
  const error = document.getElementById('name-error');

  if (!screen) {
    onDone();
    return;
  }

  input.focus();
  let isConfirmed = false;

  function confirm() {
    if (isConfirmed) return;
    const name = input.value.trim();
    if (!name) {
      error.classList.remove('hidden');
      input.classList.add('input-error');
      input.focus();
      return;
    }

    error.classList.add('hidden');
    input.classList.remove('input-error');
    isConfirmed = true;
    submit.disabled = true;
    localStorage.setItem(storageKey, name);
    screen.style.opacity = '0';
    screen.style.transition = 'opacity 0.3s';
    setTimeout(() => {
      screen.remove();
      onDone(name);
    }, 300);
  }

  submit.addEventListener('click', confirm);
  submit.addEventListener('pointerup', confirm);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') confirm();
  });
  input.addEventListener('input', () => {
    error.classList.add('hidden');
    input.classList.remove('input-error');
  });
}
