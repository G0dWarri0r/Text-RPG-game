import { HealthBar } from "./Healthbar";

export function EnemyPanel({ enemy, health, isDefeated, onAttack, isHit}) {
  return (
    <section
      className={`w-full max-w-md rounded border bg-zinc-800 p-4 transition-colors ${isHit ? "animate-shake border-red-500" : "border-red-900"
        }`}
    >
      <h2 className="text-lg font-bold text-red-400">{enemy.name}</h2>
      <p className="mb-2 text-sm text-zinc-400">{enemy.description}</p>

      <HealthBar health={health} maxHealth={enemy.maxHealth} barColor="bg-purple-500" />

      <div className="mt-2 flex gap-4 text-sm">
        <span>Attack: {enemy.attack}</span>
        <span>Defense: {enemy.defense}</span>
      </div>

      {isDefeated ? (
        <p className="mt-3 text-center text-sm font-semibold text-emerald-400">
          Defeated
        </p>
      ) : (
        <button
          type="button"
          onClick={onAttack}
          className="mt-3 w-full rounded bg-red-700 px-4 py-2 font-semibold hover:bg-red-600"
        >
          Attack
        </button>
      )}
    </section>
  );
}