const PLAYER_HIT = [
    (enemy, damage) => `You strike the ${enemy} for ${damage} damage.`,
    (enemy, damage) => `Your blow lands on the ${enemy}: ${damage} damage.`,
    (enemy, damage) => `You hit the ${enemy} hard, dealing ${damage}.`,
];

const ENEMY_HIT = [
    (enemy, damage) => `The ${enemy} hits you for ${damage}.`,
    (enemy, damage) => `The ${enemy} lashes out. You take ${damage} damage.`,
    (enemy, damage) => `You wince as the ${enemy} deals ${damage}.`,
];

const ENEMY_DEFEATED = [
    (enemy) => `The ${enemy} collapses. Victory!`,
    (enemy) => `You defeated the ${enemy}.`,
];

function pickRandom(list) {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

export function getPlayerHitMessage(enemy, damage) {
    return pickRandom(PLAYER_HIT)(enemy, damage);
}

export function getEnemyHitMessage(enemy, damage) {
    return pickRandom(ENEMY_HIT)(enemy, damage);
}

export function getEnemyDefeatedMessage(enemy) {
    return pickRandom(ENEMY_DEFEATED)(enemy);
}

export function getPlayerDiedMessage() {
    return "You collapse. The dungeon goes dark.";
}