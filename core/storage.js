export function loadJSON(key, fallbackValue) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallbackValue;
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(key);
    return fallbackValue;
  }
}

export function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadString(key, fallbackValue = '') {
  const value = localStorage.getItem(key);
  return value === null ? fallbackValue : value;
}
