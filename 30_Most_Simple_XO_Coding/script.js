const board = document.getElementById('gameBoard');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let gameActive = true;
let cells = Array(9).fill("");

function drawBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.textContent = cell;
    div.addEventListener('click', () => handleClick(index));
    board.appendChild(div);
  });
}

function handleClick(index) {
  if (cells[index] === "" && gameActive) {
    cells[index] = currentPlayer;
    drawBoard();
    if (checkWin()) {
      statusText.textContent = `${currentPlayer} wins!`;
      gameActive = false;
    } else if (!cells.includes("")) {
      statusText.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusText.textContent = `Turn: ${currentPlayer}`;
    }
  }
}

function checkWin() {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winCombos.some(combo => {
    return combo.every(index => cells[index] === currentPlayer);
  });
}

function resetGame() {
  currentPlayer = 'X';
  cells = Array(9).fill("");
  gameActive = true;
  statusText.textContent = "Turn: X";
  drawBoard();
}

// Start the game
resetGame();
