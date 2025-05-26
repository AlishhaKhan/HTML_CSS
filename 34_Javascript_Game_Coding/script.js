const box = document.getElementById("box");
const scoreText = document.getElementById("score");
const message = document.getElementById("message");

let score = 0;
let timer;

function moveBox() {
  const maxX = 350; // container width - box width
  const maxY = 350; // container height - box height

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  box.style.left = `${randomX}px`;
  box.style.top = `${randomY}px`;
}

box.addEventListener("click", () => {
  score++;
  scoreText.textContent = "Score: " + score;
  moveBox();
  clearTimeout(timer);
  startTimer();
});

function startTimer() {
  timer = setTimeout(() => {
    message.textContent = `⏱️ Time's up! Final Score: ${score}`;
    box.style.display = "none";
  }, 2000); // 2 seconds to click
}

moveBox();
startTimer();
