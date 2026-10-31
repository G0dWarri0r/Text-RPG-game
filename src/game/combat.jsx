export function calculateDamage(attacker, defender) {

    return Math.max(attacker.attack - defender.defense, 1);
}

export function applyDamage(health, damage) {
    return Math.max(health - damage, 0);
}

export function applyHealing(health, amount, maxHealth) {
  return Math.min(maxHealth, (health + amount));
}