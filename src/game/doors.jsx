export function isExitLocked(room, direction, heldItemIds) {
  const requiredItemId = room.locks[direction];
  if (!requiredItemId) return false;
  if (heldItemIds.includes(requiredItemId)) return false;
  else return true;
}