const wordList = ["apple", "river", "table", "happy", "house", "green"];
let selectedWord = "";
let guessedLetters = [];
let maxTries = 8;
let triesLeft = maxTries;

function startGame() {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  guessedLetters = [];
  triesLeft = maxTries;
  updateWordDisplay();
  document.getElementById("message").textContent = "Guess the word one letter at a time!";
  document.getElementById("usedLetters").textContent = "Used letters: ";
  document.getElementById("letterInput").value = "";
}

function updateWordDisplay() {
  const display = selectedWord
    .split("")
    .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
  document.getElementById("hiddenWord").textContent = display;

  if (!display.includes("_")) {
    document.getElementById("message").textContent = "🎉 You won!";
  }
}

function checkLetter() {
  const input = document.getElementById("letterInput");
  const letter = input.value.toLowerCase();

  if (!letter || guessedLetters.includes(letter)) {
    input.value = "";
    return;
  }

  guessedLetters.push(letter);
  document.getElementById("usedLetters").textContent += ` ${letter}`;

  if (!selectedWord.includes(letter)) {
    triesLeft--;
    document.getElementById("message").textContent = `Wrong guess! Tries left: ${triesLeft}`;
  } else {
    document.getElementById("message").textContent = "Nice guess!";
  }

  if (triesLeft === 0) {
    document.getElementById("message").textContent = `💀 Game Over! Word was: ${selectedWord}`;
    document.getElementById("hiddenWord").textContent = selectedWord.split("").join(" ");
  }

  updateWordDisplay();
  input.value = "";
}

function resetGame() {
  startGame();
}

startGame();
