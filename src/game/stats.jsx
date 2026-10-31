import { items } from "../data/items";
import { initialPlayer } from "../data/player";

export function getPlayerStats(inventoryIds) {
    const attackBonus = inventoryIds?.reduce((total, id) => {
        const item = items[id];
        return total + (item.attack ?? 0);
    }, 0);
    const defenseBonus = inventoryIds?.reduce((total, id) => {
        const item = items[id];
        return total + (item.defense ?? 0);
    }, 0);

    return {
        attack: attackBonus + initialPlayer.baseAttack,
        defense: defenseBonus + initialPlayer.baseDefense,
    };
}