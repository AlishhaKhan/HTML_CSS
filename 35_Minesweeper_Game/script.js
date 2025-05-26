const gridSize = 5;
const mineCount = 5;
let minePositions = [];
let revealedCount = 0;

function startGame() {
  const game = document.getElementById("game");
  game.innerHTML = "";
  document.getElementById("message").textContent = "Click a tile. Avoid the mines!";
  revealedCount = 0;

  // Generate grid and mines
  minePositions = generateMines();

  for (let i = 0; i < gridSize * gridSize; i++) {
    const tile = document.createElement("button");
    tile.classList.add("tile");
    tile.dataset.index = i;
    tile.onclick = () => revealTile(tile);
    game.appendChild(tile);
  }
}

function generateMines() {
  const positions = new Set();
  while (positions.size < mineCount) {
    positions.add(Math.floor(Math.random() * gridSize * gridSize));
  }
  return Array.from(positions);
}

function revealTile(tile) {
  const index = parseInt(tile.dataset.index);
  if (tile.classList.contains("revealed")) return;

  tile.classList.add("revealed");

  if (minePositions.includes(index)) {
    tile.classList.add("mine");
    tile.textContent = "💣";
    endGame(false);
  } else {
    const mineNearby = countNearbyMines(index);
    tile.textContent = mineNearby > 0 ? mineNearby : "";
    revealedCount++;
    if (revealedCount === gridSize * gridSize - mineCount) {
      endGame(true);
    }
  }
}

function countNearbyMines(index) {
  const row = Math.floor(index / gridSize);
  const col = index % gridSize;
  let count = 0;

  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if (r >= 0 && r < gridSize && c >= 0 && c < gridSize) {
        const neighborIndex = r * gridSize + c;
        if (minePositions.includes(neighborIndex)) {
          count++;
        }
      }
    }
  }

  return count;
}

function endGame(won) {
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach(tile => {
    tile.onclick = null;
    const index = parseInt(tile.dataset.index);
    if (minePositions.includes(index)) {
      tile.classList.add("mine");
      tile.textContent = "💣";
    }
  });

  document.getElementById("message").textContent = won
    ? "🎉 You won! Safe revealed!"
    : "💥 Boom! Game over!";
}

startGame();
