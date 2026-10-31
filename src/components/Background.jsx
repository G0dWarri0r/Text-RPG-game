import {roomThemes} from "../ui/RoomTheme"

export function Background({ theme }) {
  return (
    <div className="fixed inset-0 -z-10 bg-zinc-950">
      {Object.entries(roomThemes).map(([name, classes]) => (
        <div
          key={name}
          className={`absolute inset-0 transition-opacity duration-700 ${classes} ${
            theme === name ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}