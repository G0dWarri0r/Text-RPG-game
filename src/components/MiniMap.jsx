import { rooms } from "../data/rooms";

export function MiniMap({ visitedRoomIds, currentRoomId }) {

    function getSquareStyle(isCurrent, isVisited) {
        if (isCurrent) return "border-amber-400 bg-amber-600 text-white";
        if (isVisited) return "border-zinc-600 bg-zinc-800 text-zinc-300";
        return "border-dashed border-zinc-700 text-zinc-600";
    }

    return (
        <section className="mt-8">
            <div className="flex gap-6">
                <div className="flex gap-2 items-center">
                    <h2 className="mb-2 text-sm uppercase font-semibold text-blue-500">west</h2>
                    <div title="compas" className="flex flex-col gap-4">
                        <h2 className="mb-2 text-sm uppercase font-semibold text-red-500">north</h2>
                        <h2 className="mb-2 text-sm max-w-40 text-center uppercase font-semibold text-blue-500">south</h2>
                    </div>
                    <h2 className="mb-2 text-sm uppercase font-semibold text-blue-500">east</h2>
                </div>
            </div>
            <div className="grid grid-cols-[repeat(2,4.5rem)] grid-rows-[repeat(3,4.5rem)] gap-2">
                {
                    Object.values(rooms).map((room) => {
                        const isCurrent = (room.id === currentRoomId ? true : false);
                        const isVisited = (visitedRoomIds.includes(room.id) ? true : false);
                        return (
                            <div
                                key={room.id}
                                title={room.name}
                                style={{ gridColumnStart: room.x + 1, gridRowStart: room.y + 1 }}
                                className={`flex items-center justify-center text-center rounded border text-xs font-semibold ${getSquareStyle(isCurrent, isVisited)}`} >
                                {isVisited ? room.name : "?"}
                            </div>
                        )
                    })
                }
            </div>
        </section >
    );
}