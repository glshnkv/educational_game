import { loadJSON, saveJSON } from './storage.js';

export class ProgressStore {
  constructor(storageKey) {
    this.storageKey = storageKey;
    this.state = loadJSON(storageKey, {});
  }

  isTaskDone(taskId) {
    return !!this.state[taskId];
  }

  markTaskDone(taskId) {
    this.state[taskId] = true;
    if (this.getActiveTaskId() === taskId) {
      this.clearActiveTask();
      return;
    }
    this.save();
  }

  getActiveTaskId() {
    return this.state.active_task_id || null;
  }

  setActiveTask(taskId) {
    this.state.active_task_id = taskId;
    this.save();
  }

  clearActiveTask() {
    delete this.state.active_task_id;
    this.save();
  }

  getTaskCode(taskId) {
    return this.state[`${taskId}_code`];
  }

  setTaskCode(taskId, code) {
    this.state[`${taskId}_code`] = code;
    this.save();
  }

  save() {
    saveJSON(this.storageKey, this.state);
  }
}
