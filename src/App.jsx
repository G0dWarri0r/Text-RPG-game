import { useEffect, useState } from "react";
import { rooms } from "./data/rooms";
import { ExitButton } from "./components/ExitButton";
import { MiniMap } from "./components/MiniMap";
import { RoomItems } from "./components/RoomItems";
import { Inventory } from "./components/Inventory";
import { PlayerStats } from "./components/PlayerStats";
import { initialPlayer } from "./data/player";
import { getPlayerStats } from "./game/stats";
import { Background } from "./components/Background";
import { enemies } from "./data/enemies";
import { EnemyPanel } from "./components/EnemyPanel";
import { calculateDamage, applyDamage, applyHealing } from "./game/combat";
import { EndScreen } from "./components/EndScreen";
import { getEnemyDefeatedMessage, getEnemyHitMessage, getPlayerDiedMessage, getPlayerHitMessage } from "./game/messages";
import { CombatLog } from "./components/CombatLog";
import { items } from "./data/items";
import { Compass } from "./components/Compass";
import { isExitLocked } from "./game/doors";
import { FINAL_ENEMY_ID, IDLE_ATTACK_MS } from "./game/rules";
import { hasSeenTutorial, loadGame, markTutorialSeen, saveGame } from "./game/storage";
import { TutorialModal } from "./components/TutorialMode";

function App() {

  const [savedGame] = useState(loadGame);

  const [currentRoomId, setCurrentRoomId] = useState(savedGame?.currentRoomId ?? "entrance");
  const [visitedRoomIds, setVisitedRoomIds] = useState(savedGame?.visitedRoomIds ?? ["entrance"]);
  const [inventory, setInventory] = useState(savedGame?.inventory ?? []);
  const [playerHealth, setPlayerHealth] = useState(savedGame?.playerHealth ?? initialPlayer.maxHealth);
  const [combatLog, setCombatLog] = useState([]);
  const [isEnemyHit, setIsEnemyHit] = useState(false);
  const [isPlayerHit, setIsPLayerHit] = useState(false);
  const [usedItemIds, setusedItemIds] = useState(savedGame?.usedItemIds ?? []);
  const [isTutorialOpen, setIsTutorialOpen] = useState(() => !hasSeenTutorial())
  const [hitPlayer, setHitPlayer] = useState(false);
  const currentRoom = rooms[currentRoomId];
  const roomItemIds = currentRoom.itemIds.filter((id) => !inventory.includes(id));
  const heldItems = inventory.filter((id) => !usedItemIds.includes(id));
  const availableDirections = Object.keys(currentRoom.exits);
  const { name, maxHealth } = initialPlayer;
  const { attack, defense } = getPlayerStats(inventory);
  const enemy = currentRoom.enemyId ? enemies[currentRoom.enemyId] : null;
  const [enemyHealths, setEnemyHealths] = useState(savedGame?.enemyHealths ?? {});
  const enemyHealth = enemy ? (enemyHealths[enemy.id] ?? enemy.maxHealth) : null;
  const isEnemyDefeated = enemy !== null && enemyHealth === 0;
  const playerDied = playerHealth === 0;
  const hasWon = enemyHealths[FINAL_ENEMY_ID] === 0;
  const isGameOver = playerDied || hasWon;

  useEffect(() => {
    saveGame({ currentRoomId, visitedRoomIds, inventory, playerHealth, enemyHealths, usedItemIds })
  }, [currentRoomId, visitedRoomIds, inventory, playerHealth, enemyHealths, usedItemIds])

  useEffect(() => {
    if (!enemy || isEnemyDefeated || isGameOver || isTutorialOpen) return;

    const timerId = setTimeout(() => {
      addLog("info", `You are vulnerable, the ${enemy.name} attacked!`);
      handleEnemyAttack();
    }, IDLE_ATTACK_MS);

    return () => clearTimeout(timerId);
  }, [currentRoomId, enemyHealth, playerHealth, inventory, usedItemIds, isTutorialOpen]);

  function handleMove(roomId, direction) {
    if (isGameOver) return;
    const nextRoom = rooms[roomId];
    if (nextRoom.floor !== currentRoom.floor) {
      addLog("info", `You ${direction === "down" ? "descended" : "ascended"} to floor ${nextRoom.floor}`);
    }

    const keyName = items[currentRoom.locks[direction]]?.name;
    if (keyName) {
      if (isExitLocked(currentRoom, direction, heldItems)) {
        addLog("items", `The door is locked. You need the ${keyName}.`);
        return;
      }
    }

    const nextEnemy = enemies[nextRoom.enemyId]
    if (nextEnemy && enemyHealths[nextEnemy?.id] !== 0) {
      addLog("info", `The ${nextEnemy?.name} blocks your path!`);
    }
    setCurrentRoomId(roomId);
    setVisitedRoomIds((prev) => prev.includes(roomId) ? prev : [...prev, roomId]);
  }

  function handlePickUp(item) {
    const currentItem = items[item];
    if (currentItem.type === "key" && enemyHealths[currentRoom.enemyId] !== 0) {
      return addLog("items", `Defeat the ${enemies[currentRoom.enemyId].name} to obtain the ${currentItem.name}`);
    }
    setInventory((prev) => prev.includes(item) ? prev : [...prev, item]);
    addLog("items", items[item].description);
  }

  function handlePlayerAttack() {
    if (!enemy || isEnemyDefeated || isGameOver) return;
    flashEnemy();

    const damage = calculateDamage({ attack }, enemy);
    const newHealth = applyDamage(enemyHealth, damage);

    setEnemyHealths((prev) => ({ ...prev, [enemy.id]: newHealth }));
    addLog("player", getPlayerHitMessage(enemy.name, damage));
    setTimeout(() => {
      handleEnemyAttack();
      if (newHealth === 0) {
        addLog("info", getEnemyDefeatedMessage(enemy.name));
      }
    }, 100)
  }

  function handleEnemyAttack() {
    flashPlayer();
    const damage = calculateDamage(enemy, { defense });
    const newHealth = applyDamage(playerHealth, damage);

    addLog("enemy", getEnemyHitMessage(enemy.name, damage));
    setPlayerHealth(newHealth);

    if (newHealth === 0) {
      addLog("info", getPlayerDiedMessage());
    }

  }

  function handleUseItem(itemId) {
    if (isGameOver) return;

    const item = items[itemId];
    if (item.type !== "potion") return;

    if (playerHealth === initialPlayer.maxHealth) {
      addLog("info", "you are already at full HP.");
      return;
    }

    const newHealth = applyHealing(playerHealth, item.heal, initialPlayer.maxHealth);
    setPlayerHealth(newHealth);
    setusedItemIds((prev) => [...prev, item.id]);
    addLog("info", `You drink the ${item.name} and recover ${newHealth - playerHealth} HP.`);
  }

  function flashEnemy() {
    setIsEnemyHit(true);
    setTimeout(() => {
      setIsEnemyHit(false);
    }, 300)
  }

  function flashPlayer() {
    setIsPLayerHit(true);
    setTimeout(() => {
      setIsPLayerHit(false);
    }, 300)
  }

  function handleSeenTutorial(value) {
    setIsTutorialOpen(value);
    markTutorialSeen();
  }

  function newGame() {
    const confermation = window.confirm("Are you sure about this? It will reset your current progress!");
    if (confermation) {
      handleRestart()
    }
  }

  function handleRestart() {
    setCurrentRoomId("entrance");
    setVisitedRoomIds(["entrance"]);
    setInventory([]);
    setPlayerHealth(initialPlayer.maxHealth);
    setEnemyHealths({});
    setCombatLog([]);
    setusedItemIds([])
  }

  function addLog(type, text) {
    const id = crypto.randomUUID();
    setCombatLog((prev) => [...prev, { id, type, text }]);
  }

  return (
    <main className="min-h-screen p-6 text-zinc-100">
      <Background theme={currentRoomId} />
      {isTutorialOpen && <TutorialModal onClose={handleSeenTutorial} />}
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-5xl grid-cols-1 gap-6 md:grid-cols-[1fr_18rem]">

        <section className="flex flex-col items-center gap-6">
          <header className="text-center">
            <h1 className="text-3xl font-bold">{currentRoom.name}</h1>
            <p className="mt-2 max-w-prose text-zinc-300">{currentRoom.description}</p>
          </header>

          {enemy && <EnemyPanel enemy={enemy} health={enemyHealth} isDefeated={isEnemyDefeated} onAttack={handlePlayerAttack} isHit={isEnemyHit} />}

          <div className="flex flex-1 items-center justify-center gap-3">
            {
              Object.entries(currentRoom.exits).map(([direction, roomId]) => {
                return (
                  <ExitButton
                    key={direction}
                    direction={direction}
                    onClick={() => handleMove(roomId, direction)}
                    isLocked={isExitLocked(currentRoom, direction, heldItems)} />
                );
              })
            }
          </div>

          <CombatLog entries={combatLog} />

          <div className="w-full max-w-md">
            <PlayerStats name={name} health={playerHealth} maxHealth={maxHealth} attack={attack} defense={defense} isHit={isPlayerHit} />
          </div>

        </section>

        <aside className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <MiniMap visitedRoomIds={visitedRoomIds} currentRoomId={currentRoomId} floor={currentRoom.floor} />
            <Compass availableDirections={availableDirections} />
          </div>
          <Inventory itemIds={heldItems} onUse={handleUseItem} openHowToPlay={handleSeenTutorial} newGame={newGame} />
          <RoomItems itemIds={roomItemIds} onPickUp={handlePickUp} />
        </aside>

      </div>

      {playerDied && (
        <EndScreen
          title="You Died"
          message="The dungeon claims another adventurer."
          titleClass="text-red-500"
          buttonLabel="Try again"
          onRestart={handleRestart}
        />
      )}

      {hasWon && (
        <EndScreen
          title="Victory!"
          message="The guardian falls and the treasure is yours."
          titleClass="text-emerald-400"
          buttonLabel="Play again"
          onRestart={handleRestart}
        />
      )}


    </main>
  );

}

export default App;