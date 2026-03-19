import { sanitizeHTML } from '../core/sanitize.js';

export function openEditor(ui, task) {
  ui.currentTask = task;
  ui._lastOpenedTask = task;
  ui.bcTask.textContent = task.title;

  ui.editorTaskTitle.textContent = task.title;
  ui.taskContext.innerHTML = sanitizeHTML(task.context);
  ui.theoryBody.innerHTML = sanitizeHTML(task.theory);
  ui.taskDescription.innerHTML = sanitizeHTML(task.description);

  ui.theoryHeader.classList.remove('open');
  ui.theoryBody.classList.remove('open');

  const saved = ui.progressStore.getTaskCode(task.id);
  ui.codeEditor.value = saved || task.starterCode;
  updateGutter(ui);

  if (ui.editorFilename) {
    ui.editorFilename.textContent = task.id.startsWith('css')
      ? 'style.css'
      : task.id.startsWith('js')
        ? 'script.js'
        : 'index.html';
  }

  ui.taskFeedback.classList.add('hidden');
  ui._showScreen('editor');
  requestAnimationFrame(() => runPreview(ui));
}

export function updateGutter(ui) {
  const lines = ui.codeEditor.value.split('\n').length;
  ui.editorGutter.textContent = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
}

export function runPreview(ui) {
  const code = ui.codeEditor.value;
  const task = ui.currentTask;

  let html;

  if (task && task.id.startsWith('css')) {
    const styleMatch = code.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    const styleContent = styleMatch ? styleMatch[1] : '';
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

  ui.previewFrame.srcdoc = '';
  setTimeout(() => {
    ui.previewFrame.srcdoc = html;
  }, 0);
}

export function checkTask(ui) {
  const code = ui.codeEditor.value;
  let result;
  try {
    result = ui.currentTask.check(code);
  } catch (err) {
    result = { ok: false, hint: `Проверка не выполнилась: ${err?.message || 'неизвестная ошибка'}` };
  }
  ui.taskFeedback.classList.remove('hidden');

  if (result.ok) {
    ui.feedbackIcon.textContent = '🎉';
    ui.feedbackText.textContent = `Отлично! ${ui.currentTask.reward}`;
    ui.feedbackHint.classList.add('hidden');
    ui.feedbackContinue.classList.remove('hidden');
    ui.feedbackRetry.style.display = 'none';

    if (!ui.progress[ui.currentTask.id]) {
      ui.progressStore.markTaskDone(ui.currentTask.id);
      ui._updateHUD();
      setTimeout(() => ui._showToast(ui.currentTask.reward), 300);
    }
    return;
  }

  ui.feedbackIcon.textContent = '🤔';
  ui.feedbackText.textContent = 'Почти! Есть небольшая ошибка.';
  ui.feedbackHint.textContent = `💡 Подсказка: ${result.hint}`;
  ui.feedbackHint.classList.remove('hidden');
  ui.feedbackContinue.classList.add('hidden');
  ui.feedbackRetry.style.display = '';
}
