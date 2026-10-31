const SAVE_KEY = "dungeon-crawler-save";

export function saveGame(gameState) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
}

export function loadGame() {
  try {
    const text = localStorage.getItem(SAVE_KEY);
    if (!text) return null;
    return JSON.parse(text);
  } catch {
    return null;
  }
}