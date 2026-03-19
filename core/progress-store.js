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
