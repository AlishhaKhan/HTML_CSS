const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ball properties
const ballRadius = 15;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 4;
let dy = -4;

// Paddle properties
const paddleHeight = 12;
const paddleWidth = 100;
let paddleX = (canvas.width - paddleWidth) / 2;

// Control variables
let rightPressed = false;
let leftPressed = false;

// Score
let score = 0;

// Event listeners for keyboard controls
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  document.getElementById('score').textContent = 'Score: ' + score;
}

function resetGame() {
  alert('Game Over! Your Score: ' + score);
  document.location.reload();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawScore();

  // Ball movement
  x += dx;
  y += dy;

  // Bounce off left/right walls
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  // Bounce off top wall
  if (y + dy < ballRadius) {
    dy = -dy;
  }
  // Bounce off paddle
  else if (y + dy > canvas.height - ballRadius - paddleHeight - 10) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
      score++;
      // Increase speed a bit
      dx *= 1.05;
      dy *= 1.05;
    } else if (y + dy > canvas.height - ballRadius) {
      // Ball missed paddle, game over
      resetGame();
    }
  }

  // Paddle movement
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  requestAnimationFrame(draw);
}

draw();
