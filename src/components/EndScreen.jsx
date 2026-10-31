
export function EndScreen({ title, message, titleClass, buttonLabel, onRestart }) {
  return (
    <div className="fixed inset-0 z-20 flex flex-col items-center justify-center gap-6 bg-black/80 text-center">
      <h2 className={`text-5xl font-bold ${titleClass}`}>{title}</h2>
      <p className="max-w-sm text-zinc-300">{message}</p>
      <button
        type="button"
        onClick={onRestart}
        className="rounded bg-amber-600 px-6 py-3 font-semibold hover:bg-amber-500"
      >
        {buttonLabel}
      </button>
    </div>
  );
}