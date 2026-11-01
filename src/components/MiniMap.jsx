import { rooms } from "../data/rooms";
import { getMapSize } from "../game/map";

export function MiniMap({ visitedRoomIds, currentRoomId }) {

    function getSquareStyle(isCurrent, isVisited) {
        if (isCurrent) return "border-amber-400 bg-amber-600 text-white";
        if (isVisited) return "border-zinc-600 bg-zinc-800 text-zinc-300";
        return "border-dashed border-zinc-700 text-zinc-600";
    }

    const { columns, rows } = getMapSize(rooms);

    return (
        <section className="mt-8">
            <h2 className="mb-4 text-zinc-400 font-semibold">Map</h2>
            <div
                className="grid gap-2"
                style={{
                    gridTemplateColumns: `repeat(${columns})`,
                    gridTemplateRows: `repeat(${rows})`, }}>
                {
                    Object.values(rooms).map((room) => {
                        const isCurrent = (room.id === currentRoomId ? true : false);
                        const isVisited = (visitedRoomIds.includes(room.id) ? true : false);
                        return (
                            <div
                                key={room.id}
                                title={room.name}
                                style={{ gridColumnStart: room.x + 1, gridRowStart: room.y + 1 }}
                                className={`flex items-center justify-center h-10 w-40 text-center rounded border text-xs font-semibold ${getSquareStyle(isCurrent, isVisited)}`} >
                                {isVisited ? room.name : "?"}
                            </div>
                        )
                    })
                }
            </div>
        </section >
    );
}