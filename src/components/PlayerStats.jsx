import { HealthBar } from "./Healthbar";

export function PlayerStats({ name, health, maxHealth, attack, defense, isHit}) {

  return (
    <section className={`mt-6 rounded border bg-zinc-800 p-4 ${isHit ? "animate-shake border-red-500" : "border-zinc-700"}`}>
      <h2 className="mb-2 text-lg font-bold">{name}</h2>

      <HealthBar health={health} maxHealth={maxHealth} barColor={"bg-red-500"} />

      <div className="mt-2 flex gap-4 text-sm">
        <span>Attack: {attack}</span>
        <span>Defense: {defense}</span>
      </div>
    </section>
  );
}