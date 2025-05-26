function flipCoin() {
  const coin = document.getElementById("coin");
  const resultText = document.getElementById("result");

  const outcome = Math.random() < 0.5 ? "head" : "tail";

  coin.src = `assets/${outcome}.png`;
  coin.style.transform = "rotateY(360deg)";

  resultText.textContent = `It's ${outcome.toUpperCase()}!`;
}
