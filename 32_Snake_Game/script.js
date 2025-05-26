const board = document.getElementById('gameBoard');
const scoreText = document.getElementById('score');

const boardSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = randomFood();
let direction = { x: 0, y: 0 };
let score = 0;

function drawBoard() {
  board.innerHTML = "";
  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      if (x === food.x && y === food.y) {
        cell.classList.add('food');
      }

      snake.forEach(part => {
        if (part.x === x && part.y === y) {
          cell.classList.add('snake');
        }
      });

      board.appendChild(cell);
    }
  }
}

function randomFood() {
  return {
    x: Math.floor(Math.random() * boardSize),
    y: Math.floor(Math.random() * boardSize)
  };
}

function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Check wall or self collision
  if (
    head.x < 0 || head.x >= boardSize ||
    head.y < 0 || head.y >= boardSize ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    alert("Game Over! Final Score: " + score);
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    food = randomFood();
    score = 0;
    scoreText.textContent = "Score: 0";
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 1;
    scoreText.textContent = "Score: " + score;
    food = randomFood();
  } else {
    snake.pop();
  }

  drawBoard();
}

document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      if (direction.y !== 1) direction = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (direction.y !== -1) direction = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (direction.x !== 1) direction = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x !== -1) direction = { x: 1, y: 0 };
      break;
  }
});

setInterval(moveSnake, 150);
drawBoard();
