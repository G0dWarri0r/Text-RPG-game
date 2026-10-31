
export function HealthBar({ health, maxHealth, barColor }) {
    const percent = (health / maxHealth) * 100;

    return (
        <div>
            <div className="h-3 w-full overflow-hidden rounded bg-zinc-700">
                <div
                    className={`h-full transition-all duration-300 ${barColor}`}
                    style={{ width: `${percent}%` }}
                />
            </div>
            <p className="mt-1 text-sm text-zinc-300">
                HP {health} / {maxHealth}
            </p>
        </div>
    );
}