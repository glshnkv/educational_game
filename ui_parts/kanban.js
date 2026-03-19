import { TASKS } from '../tasks.js';

export function renderHome(ui, modules) {
  const done = TASKS.filter((t) => ui.progress[t.id]).length;
  if (ui.homeDone) ui.homeDone.textContent = `${done}/${TASKS.length}`;

  ui.moduleGrid.innerHTML = '';
  modules.forEach((mod) => {
    const modTasks = TASKS.filter((t) => mod.taskIds.includes(t.id));
    const modDone = modTasks.filter((t) => ui.progress[t.id]).length;
    const pct = modTasks.length ? Math.round((modDone / modTasks.length) * 100) : 0;

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
      ui.currentModule = mod;
      ui.bcModule.textContent = `${mod.icon} ${mod.name}`;
      ui._showScreen('kanban');
    });
    ui.moduleGrid.appendChild(card);
  });
}

export function renderKanban(ui) {
  if (!ui.currentModule) return;
  const mod = ui.currentModule;
  const modTasks = TASKS.filter((t) => mod.taskIds.includes(t.id));
  const done = modTasks.filter((t) => ui.progress[t.id]).length;

  ui.kanbanTitle.textContent = `${mod.icon} ${mod.name}`;
  ui.kanbanMeta.textContent = `${done}/${modTasks.length} выполнено`;

  ui.cardsTodo.innerHTML = '';
  ui.cardsProgress.innerHTML = '';
  ui.cardsDone.innerHTML = '';

  let nTodo = 0;
  let nProgress = 0;
  let nDone = 0;

  modTasks.forEach((task) => {
    const isDone = !!ui.progress[task.id];
    const isActive = ui.currentTask && ui.currentTask.id === task.id && !isDone;
    const card = makeTaskCard(ui, task, isDone);

    if (isDone) {
      ui.cardsDone.appendChild(card);
      nDone++;
    } else if (isActive) {
      ui.cardsProgress.appendChild(card);
      nProgress++;
    } else {
      ui.cardsTodo.appendChild(card);
      nTodo++;
    }
  });

  ui.countTodo.textContent = nTodo;
  ui.countProgress.textContent = nProgress;
  ui.countDone.textContent = nDone;
}

export function makeTaskCard(ui, task, isDone) {
  const tagClass = task.id.startsWith('css')
    ? 'tag-css'
    : task.id.startsWith('js')
      ? 'tag-js'
      : 'tag-html';
  const tagLabel = task.id.startsWith('css')
    ? 'CSS'
    : task.id.startsWith('js')
      ? 'JS'
      : 'HTML';

  const card = document.createElement('div');
  card.className = `task-card${isDone ? ' is-done' : ''}`;
  card.innerHTML = `
    <span class="task-card-tag ${tagClass}">${tagLabel}</span>
    <div class="task-card-title">${task.title}</div>
    <div class="task-card-footer">
      ${
        isDone
          ? '<span class="task-card-status">✅ Выполнено</span>'
          : `<button class="task-card-open-btn">Открыть →</button>`
      }
    </div>
  `;

  if (!isDone) {
    card.querySelector('.task-card-open-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      ui._openEditor(task);
    });
    card.addEventListener('click', () => ui._openEditor(task));
  }
  return card;
}
