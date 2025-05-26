const emojis = ['🐶', '🐱', '🐼', '🦁', '🐸', '🦊', '🐮', '🐵'];
let cards = [...emojis, ...emojis];
cards.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById('gameBoard');
let flippedCards = [];
let lockBoard = false;
let matchedPairs = 0;
const totalPairs = emojis.length;

cards.forEach((emoji) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="front">${emoji}</div>
    <div class="back"></div>
  `;
  card.dataset.emoji = emoji;
  card.addEventListener('click', () => flipCard(card));
  gameBoard.appendChild(card);
});

function flipCard(card) {
  if (lockBoard || card.classList.contains('matched') || card.classList.contains('flip')) return;

  card.classList.add('flip');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    lockBoard = true;
    const [first, second] = flippedCards;

    if (first.dataset.emoji === second.dataset.emoji) {
      first.classList.add('matched');
      second.classList.add('matched');
      matchedPairs++;
      flippedCards = [];
      lockBoard = false;

      if (matchedPairs === totalPairs) {
        setTimeout(celebrateWin, 500);
      }
    } else {
      setTimeout(() => {
        first.classList.remove('flip');
        second.classList.remove('flip');
        flippedCards = [];
        lockBoard = false;
      }, 1000);
    }
  }
}

function celebrateWin() {
  confetti({
    particleCount: 200,
    spread: 90,
    origin: { y: 0.6 },
    colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7']
  });

  setTimeout(() => {
    alert("🎉 Congratulations! You've matched all the animals! 🎊");
  }, 500);
}
