import { items } from "../data/items";

export function Inventory({ itemIds, onUse}) {
    return (
        <section className="mt-6">
            <h2 className="mb-2 text-sm uppercase tracking-wide text-zinc-400">
                Inventory
            </h2>

            {!itemIds.length && <p className="text-sm text-zinc-500">Nothing yet.</p>}

            <ul className="space-y-1 text-sm">
                {itemIds.map((id) => (
                    <li key={id} className="flex items-center justify-between gap-2">
                        <span>{items[id].name}</span>
                        {items[id].type === "potion" && (
                            <button
                                type="button"
                                onClick={() => onUse(items[id].id)}
                                className="rounded bg-emerald-400 px-2 py-1 text-xs font-semibold hover:bg-emerald-500"
                            >
                                Use
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}