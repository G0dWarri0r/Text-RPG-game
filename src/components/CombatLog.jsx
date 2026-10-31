const TYPE_STYLES = {
  player: "text-emerald-400",
  enemy: "text-red-400",
  info: "text-amber-300",
};

export function CombatLog({ entries }) {
  if (entries.length === 0) return null;

  return (
    <section className="w-full max-w-md rounded border border-zinc-700 bg-zinc-900/70 p-3">
      <h2 className="mb-2 text-sm uppercase tracking-wide text-zinc-400">
        Combat log
      </h2>

      <ul className="space-y-1 text-sm">
        {entries.slice(-6).map((entry) => (
          <li key={entry.id} className={TYPE_STYLES[entry.type]}>
            {entry.text}
          </li>
        ))}
      </ul>
    </section>
  );
}