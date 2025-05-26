const gridContainer = document.getElementById("grid-container");
const scoreDisplay = document.getElementById("score");

let grid = [];
let score = 0;

// Initialize empty grid
function initGrid() {
  grid = Array(4).fill().map(() => Array(4).fill(0));
  addRandomTile();
  addRandomTile();
  updateGrid();
}

function addRandomTile() {
  let emptyCells = [];
  grid.forEach((row, r) => {
    row.forEach((val, c) => {
      if (val === 0) emptyCells.push({ r, c });
    });
  });

  if (emptyCells.length === 0) return;

  const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  grid[r][c] = Math.random() < 0.9 ? 2 : 4;
}

function updateGrid() {
  gridContainer.innerHTML = "";
  grid.forEach(row => {
    row.forEach(val => {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      if (val > 0) tile.classList.add(`tile-${val}`);
      tile.textContent = val > 0 ? val : "";
      gridContainer.appendChild(tile);
    });
  });
  scoreDisplay.textContent = score;
}

// Movement logic
function move(direction) {
  let moved = false;
  for (let i = 0; i < 4; i++) {
    let row = grid[i];
    let original = [...row];

    let filtered = row.filter(n => n);
    let merged = [];

    for (let j = 0; j < filtered.length; j++) {
      if (filtered[j] === filtered[j + 1]) {
        merged.push(filtered[j] * 2);
        score += filtered[j] * 2;
        j++;
      } else {
        merged.push(filtered[j]);
      }
    }
    while (merged.length < 4) merged.push(0);
    if (direction === "left") {
      grid[i] = merged;
    } else if (direction === "right") {
      grid[i] = merged.reverse();
    }
    if (JSON.stringify(grid[i]) !== JSON.stringify(original)) moved = true;
  }
  return moved;
}

function rotateGrid(clockwise = true) {
  const newGrid = Array(4).fill().map(() => Array(4).fill(0));
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      newGrid[c][clockwise ? 3 - r : r] = grid[r][c];
    }
  }
  grid = newGrid;
}

function handleInput(e) {
  let moved = false;
  switch (e.key) {
    case "ArrowLeft":
      moved = move("left");
      break;
    case "ArrowRight":
      grid = grid.map(row => row.reverse());
      moved = move("left");
      grid = grid.map(row => row.reverse());
      break;
    case "ArrowUp":
      rotateGrid();
      moved = move("left");
      rotateGrid(false);
      break;
    case "ArrowDown":
      rotateGrid();
      grid = grid.map(row => row.reverse());
      moved = move("left");
      grid = grid.map(row => row.reverse());
      rotateGrid(false);
      break;
  }

  if (moved) {
    addRandomTile();
    updateGrid();
  }
}

document.addEventListener("keydown", handleInput);

initGrid();
