import { TASKS } from '../tasks.js';
import { sanitizeHTML } from '../core/sanitize.js';
import { NPC_DATA } from '../data/npc-data.js';

export function showDialog(ui, npcId, lines, taskId = null) {
  const npc = NPC_DATA[npcId] || NPC_DATA.boss;
  if (npc.avatar) {
    ui.dialogAvatar.style.background = npc.color;
    ui.dialogAvatar.innerHTML = `<img src="${npc.avatar}" alt="${npc.name}" class="dialog-avatar-img">`;
  } else {
    ui.dialogAvatar.innerHTML = npc.emoji;
    ui.dialogAvatar.style.background = npc.color;
  }
  ui.dialogSpeaker.textContent = npc.name;

  ui.currentDialogLines = lines;
  ui.currentDialogIndex = 0;
  if (taskId !== null) {
    ui.currentTask = TASKS.find((t) => t.id === taskId) || null;
  }

  showDialogLine(ui);
  ui.dialogOverlay.classList.remove('hidden');
}

export function showDialogLine(ui) {
  const line = ui.currentDialogLines[ui.currentDialogIndex];
  ui.dialogText.innerHTML = sanitizeHTML(line);
  const isLast = ui.currentDialogIndex === ui.currentDialogLines.length - 1;
  ui.dialogNext.classList.toggle('hidden', isLast && !!ui.currentTask);
  ui.dialogTask.classList.toggle('hidden', !isLast || !ui.currentTask);
}

export function nextDialogLine(ui) {
  ui.currentDialogIndex++;
  if (ui.currentDialogIndex < ui.currentDialogLines.length) {
    showDialogLine(ui);
  } else {
    closeDialog(ui);
  }
}

export function closeDialog(ui) {
  ui.dialogOverlay.classList.add('hidden');
}
