import { items } from "../data/items"

export function RoomItems({ itemIds, onPickUp }) {

    if (!itemIds.length) {
        return;
    }

    return (
        <section className="mt-6">
            <h2 className="mb-2 text-sm uppercase tracking-wide text-zinc-400">
                Items here
            </h2>

            <ul className="space-y-2">
                {itemIds.map((id) => {
                    const item = items[id];

                    return (
                        <li
                            key={item.id}
                            className="flex items-center justify-between gap-4 rounded border border-zinc-700 bg-zinc-800 px-3 py-2">
                            <span>{item.name}</span>
                            <button
                                type="button"
                                onClick={() => onPickUp(item.id)}
                                className="rounded bg-emerald-600 px-3 py-1 text-sm font-semibold hover:bg-emerald-500">
                                Pick up
                            </button>
                        </li>
                    )
                })}
            </ul >
        </section >
    )
}