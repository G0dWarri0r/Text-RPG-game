
export function ExitButton({ direction, onClick, isLocked}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded px-4 py-2 font-semibold capitalize ${isLocked
                    ? "bg-zinc-700 text-zinc-400 hover:bg-zinc-600"
                    : "bg-amber-600 hover:bg-amber-500"
                }`}
        >
            {direction}{isLocked && " (locked)"}
        </button>
    )
}