// Mario Bros Number Game logic

const guessBtn = document.getElementById('guessBtn');
const restartBtn = document.getElementById('restartBtn');
const guessInput = document.getElementById('guessInput');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');

let secretNumber;
let attempts;

function initGame() {
    secretNumber = Math.floor(Math.random() * 50) + 1; // 1 to 50
    attempts = 0;
    feedback.textContent = '';
    scoreDisplay.textContent = '';
    guessInput.value = '';
    guessInput.disabled = false;
    guessBtn.style.display = 'inline-block';
    restartBtn.style.display = 'none';
}

function checkGuess() {
    const guess = Number(guessInput.value);

    if (!guess || guess < 1 || guess > 50) {
        feedback.textContent = 'Please enter a number between 1 and 50!';
        return;
    }

    attempts++;

    if (guess === secretNumber) {
        feedback.textContent = `🎉 Congrats! You guessed it in ${attempts} tries!`;
        scoreDisplay.textContent = 'Mario says: You win! 🍄';
        guessInput.disabled = true;
        guessBtn.style.display = 'none';
        restartBtn.style.display = 'inline-block';
    } else if (guess < secretNumber) {
        feedback.textContent = 'Try a higher number! ⬆️';
    } else {
        feedback.textContent = 'Try a lower number! ⬇️';
    }
}

guessBtn.addEventListener('click', checkGuess);

restartBtn.addEventListener('click', initGame);

// Initialize game on page load
initGame();
