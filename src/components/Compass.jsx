const DIRECTIONS = [
    { name: "north", label: "N", position: "col-start-2 row-start-1" },
    { name: "west", label: "W", position: "col-start-1 row-start-2" },
    { name: "east", label: "E", position: "col-start-3 row-start-2" },
    { name: "south", label: "S", position: "col-start-2 row-start-3" },
];

const STAIRS = [
    { name: "up", label: "▲ Up" },
    { name: "down", label: "▼ Down" },
];

export function Compass({ availableDirections }) {
    return (
        <section>
            <h2 className="mb-2 text-sm uppercase tracking-wide text-zinc-400">
                Compass
            </h2>

            <div className="grid h-24 w-24 grid-cols-3 grid-rows-3 place-items-center rounded-full border border-zinc-700 bg-zinc-800">
                {DIRECTIONS.map(({ name, label, position }) => (
                    <span
                        key={name}
                        className={`text-sm font-bold ${position} ${availableDirections.includes(name) ? "text-amber-400" : "text-zinc-600"
                            }`}
                    >
                        {label}
                    </span>
                ))}

                <span className="col-start-2 row-start-2 size-1.5 rounded-full bg-zinc-500" />
            </div>

            <div className="mt-2 flex gap-3 text-xs font-semibold">
                {STAIRS.map(({ name, label }) => (
                    <span
                        key={name}
                        className={availableDirections.includes(name) ? "text-amber-400" : "text-zinc-600"}
                    >
                        {label}
                    </span>
                ))}
            </div >
        </section >
    );
}