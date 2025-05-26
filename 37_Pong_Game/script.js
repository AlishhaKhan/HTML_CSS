const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game elements
const paddleHeight = 75;
const paddleWidth = 10;
let playerY = (canvas.height - paddleHeight) / 2;
let aiY = (canvas.height - paddleHeight) / 2;

const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 3;

let playerScore = 0;
let aiScore = 0;

// Event listener
document.addEventListener("mousemove", movePaddle);

function movePaddle(e) {
  const rect = canvas.getBoundingClientRect();
  playerY = e.clientY - rect.top - paddleHeight / 2;
}

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = 3;
}

function drawNet() {
  for (let i = 0; i < canvas.height; i += 15) {
    drawRect(canvas.width / 2 - 1, i, 2, 10, "#999");
  }
}

function draw() {
  // Clear canvas
  drawRect(0, 0, canvas.width, canvas.height, "#fff");

  // Draw net
  drawNet();

  // Draw paddles
  drawRect(0, playerY, paddleWidth, paddleHeight, "#8e24aa");
  drawRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight, "#ab47bc");

  // Draw ball
  drawCircle(ballX, ballY, ballSize, "#7b1fa2");

  // Draw score
  document.getElementById("score").textContent = `Player: ${playerScore} | AI: ${aiScore}`;
}

function update() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Wall collision
  if (ballY <= 0 || ballY >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // AI paddle follow ball
  aiY += ((ballY - (aiY + paddleHeight / 2)) * 0.09);

  // Player paddle collision
  if (
    ballX <= paddleWidth &&
    ballY >= playerY &&
    ballY <= playerY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // AI paddle collision
  if (
    ballX >= canvas.width - paddleWidth - ballSize &&
    ballY >= aiY &&
    ballY <= aiY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Missed ball
  if (ballX < 0) {
    aiScore++;
    resetBall();
  }

  if (ballX > canvas.width) {
    playerScore++;
    resetBall();
  }
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
