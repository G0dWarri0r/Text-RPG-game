import { items } from "../data/items";

export function Inventory({ itemIds, onUse, openHowToPlay, newGame }) {
    return (
        <section className="mt-6">
            <div className="flex gap-4 self-start">
                <button
                    type="button"
                    onClick={() => openHowToPlay(true)}
                    className="text-sm text-amber-400 underline hover:text-amber-300"
                >
                    How to play
                </button>
                <button
                    type="button"
                    onClick={newGame}
                    className="text-sm text-amber-400 underline hover:text-red-400"
                >
                    New game
                </button>
            </div >
            <h2 className="mb-2 mt-4 text-sm uppercase tracking-wide text-zinc-400">
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
        </section >
    );
}