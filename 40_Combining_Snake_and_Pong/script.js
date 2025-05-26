const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
let snake = [{ x: 5, y: 5 }];
let dx = 1, dy = 0;
let ball = { x: 10, y: 10, dx: 1, dy: 1 };
let score = 0;
let gameOver = false;

function drawSnake() {
  ctx.fillStyle = 'lime';
  snake.forEach(part => {
    ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
  });
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  snake.pop();
}

function drawBall() {
  ctx.fillStyle = 'orange';
  ctx.beginPath();
  ctx.arc(ball.x * gridSize + 10, ball.y * gridSize + 10, 8, 0, Math.PI * 2);
  ctx.fill();
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall bounce
  if (ball.y <= 0 || ball.y >= canvas.height / gridSize - 1) {
    ball.dy *= -1;
  }
  if (ball.x <= 0 || ball.x >= canvas.width / gridSize - 1) {
    ball.dx *= -1;
  }

  // Snake bounce
  if (snake.some(part => part.x === ball.x && part.y === ball.y)) {
    ball.dx *= -1;
    ball.dy *= -1;
    growSnake();
    score++;
    document.getElementById('score').innerText = 'Score: ' + score;
  }
}

function growSnake() {
  const tail = snake[snake.length - 1];
  snake.push({ x: tail.x, y: tail.y });
}

function checkGameOver() {
  if (
    ball.x < 0 || ball.x > canvas.width / gridSize ||
    ball.y < 0 || ball.y > canvas.height / gridSize
  ) {
    gameOver = true;
    alert("🎮 Game Over! Final Score: " + score);
    document.location.reload();
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
  if (gameOver) return;
  clearCanvas();
  moveSnake();
  drawSnake();
  moveBall();
  drawBall();
  checkGameOver();
}

setInterval(gameLoop, 120);

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp' && dy !== 1)    { dx = 0; dy = -1; }
  if (e.key === 'ArrowDown' && dy !== -1) { dx = 0; dy = 1; }
  if (e.key === 'ArrowLeft' && dx !== 1)  { dx = -1; dy = 0; }
  if (e.key === 'ArrowRight' && dx !== -1){ dx = 1; dy = 0; }
});
