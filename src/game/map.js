export function getMapSize(roomList) {

  const columns = Math.max(...roomList.map((room) => room.x)) + 1;
  const rows = Math.max(...roomList.map((room) => room.y)) + 1;

  return { columns, rows };
}

export function getRoomsOnFloor(rooms, floor) {
  return Object.values(rooms).filter((room) => room.floor === floor);
}