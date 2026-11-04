export function TutorialModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-lg rounded-lg border border-zinc-700 bg-zinc-900 p-6">
        <h2 className="text-2xl font-bold text-amber-400">How to play</h2>

        <ul className="mt-4 space-y-3 text-sm text-zinc-300">
          <li>
            <span className="font-semibold text-zinc-100">Explore.</span> Use the
            direction buttons to move. The compass lights up the ways you can
            go, and the map fills in as you visit rooms.
          </li>
          <li>
            <span className="font-semibold text-zinc-100">Collect.</span> Pick up
            items in each room. Weapons raise your Attack and armor raises your
            Defense, only one Weapon and Armor can be used at a time.
          </li>
          <li>
            <span className="font-semibold text-zinc-100">Fight.</span> Enemies
            guard some rooms. Press Attack and they hit back. Damage is the
            attacker's Attack minus the target's Defense, and always at least 1.
          </li>
          <li>
            <span className="font-semibold text-zinc-100">Heal.</span> Use potions
            from your inventory. They never heal past your maximum health.
          </li>
          <li>
            <span className="font-semibold text-zinc-100">Unlock.</span> Some doors
            are locked. Find the right key to open them.
          </li>
          <li>
            <span className="font-semibold text-zinc-100">Goal.</span> Descend into the flooded depths 
            and defeat the ruler of the drowned halls.
          </li>
        </ul>

        <button
          type="button"
          onClick={() => onClose(false)}
          className="mt-6 w-full rounded bg-amber-600 px-4 py-2 font-semibold hover:bg-amber-500"
        >
          Start playing
        </button>
      </div>
    </div>
  );
}