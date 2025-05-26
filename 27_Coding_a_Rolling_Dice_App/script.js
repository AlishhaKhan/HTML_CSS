const diceImage = document.getElementById('diceImage');
const rollBtn = document.getElementById('rollBtn');

rollBtn.addEventListener('click', () => {
  const roll = Math.floor(Math.random() * 6) + 1;
  diceImage.src = `dice${roll}.png`;
  diceImage.style.transform = 'rotate(360deg)';
  setTimeout(() => {
    diceImage.style.transform = 'rotate(0deg)';
  }, 200);
});
