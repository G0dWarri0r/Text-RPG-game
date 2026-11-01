export function getMapSize(rooms) {
  const roomList = Object.values(rooms);

  const columns = Math.max(roomList.map((room) => {
    return room.x;
  })) + 1;
  const rows = Math.max(roomList.map((room) => {
    return room.y;
  })) + 1;

  return { columns, rows };
}