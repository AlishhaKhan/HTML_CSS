const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');
ctx.scale(20, 20); // 240x400 → 12x20 blocks

const scoreEl = document.getElementById('score');
let score = 0;

const colors = [
  null,
  '#6eff6e', // T
  '#fffe6e', // O
  '#6effff', // I
  '#ff6e6e', // L
  '#6e6eff', // J
  '#ff6eff', // S
  '#6effae', // Z
];

function arenaSweep() {
  outer: for (let y = arena.length - 1; y >= 0; --y) {
    for (let x = 0; x < arena[y].length; ++x) {
      if (!arena[y][x]) continue outer;
    }
    const row = arena.splice(y, 1)[0].fill(0);
    arena.unshift(row);
    y++;
    score += 10;
    scoreEl.textContent = 'Score: ' + score;
  }
}

function collide(arena, player) {
  const [m, o] = [player.matrix, player.pos];
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

function createMatrix(w, h) {
  const matrix = [];
  while (h--) matrix.push(new Array(w).fill(0));
  return matrix;
}

function createPiece(type) {
  if (type === 'T') return [[0,1,0],[1,1,1],[0,0,0]];
  if (type === 'O') return [[2,2],[2,2]];
  if (type === 'I') return [[0,0,0,0],[3,3,3,3],[0,0,0,0],[0,0,0,0]];
  if (type === 'L') return [[0,4,0],[0,4,0],[0,4,4]];
  if (type === 'J') return [[0,5,0],[0,5,0],[5,5,0]];
  if (type === 'S') return [[0,6,6],[6,6,0],[0,0,0]];
  if (type === 'Z') return [[7,7,0],[0,7,7],[0,0,0]];
}

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((val, x) => {
      if (val) {
        ctx.fillStyle = colors[val];
        ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

function draw() {
  ctx.fillStyle = '#193d19';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawMatrix(arena, {x:0, y:0});
  drawMatrix(player.matrix, player.pos);
}

function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((val, x) => {
      if (val) {
        arena[y + player.pos.y][x + player.pos.x] = val;
      }
    });
  });
}

function playerDrop() {
  player.pos.y++;
  if (collide(arena, player)) {
    player.pos.y--;
    merge(arena, player);
    playerReset();
    arenaSweep();
  }
  dropCounter = 0;
}

function playerMove(dir) {
  player.pos.x += dir;
  if (collide(arena, player)) {
    player.pos.x -= dir;
  }
}

function playerReset() {
  const pieces = 'TOLJISZ';
  player.matrix = createPiece(pieces[Math.floor(Math.random() * pieces.length)]);
  player.pos.y = 0;
  player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
  if (collide(arena, player)) {
    arena.forEach(row => row.fill(0));
    score = 0;
    scoreEl.textContent = 'Score: 0';
    alert('Game Over');
  }
}

function playerRotate() {
  rotate(player.matrix);
  if (collide(arena, player)) {
    rotate(player.matrix, true); // undo
  }
}

function rotate(matrix, reverse = false) {
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < y; ++x) {
      [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
    }
  }
  if (reverse) {
    matrix.forEach(row => row.reverse());
  } else {
    matrix.reverse();
  }
}

let dropCounter = 0;
let dropInterval = 800;
let lastTime = 0;

function update(time = 0) {
  const delta = time - lastTime;
  lastTime = time;
  dropCounter += delta;
  if (dropCounter > dropInterval) {
    playerDrop();
  }
  draw();
  requestAnimationFrame(update);
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') playerMove(-1);
  if (e.key === 'ArrowRight') playerMove(1);
  if (e.key === 'ArrowDown') playerDrop();
  if (e.key === 'ArrowUp') playerRotate();
});

const arena = createMatrix(12, 20);
const player = {
  pos: {x: 0, y: 0},
  matrix: null
};

playerReset();
update();
