import React, { useEffect, useState } from "react";
import Card from "./Card";
import { generateCards } from "./data";
import "./index.css";

export default function App() {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [turns, setTurns] = useState(0);

  useEffect(() => {
    setCards(generateCards());
  }, []);

  const handleCardClick = (card) => {
    if (disabled || card === firstCard) return;

    if (!firstCard) {
      setFirstCard(card);
    } else {
      setSecondCard(card);
      setDisabled(true);

      if (firstCard.image === card.image) {
        setCards((prev) =>
          prev.map((c) =>
            c.image === card.image ? { ...c, matched: true } : c
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 800);
      }
    }
  };

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  const restartGame = () => {
    setCards(generateCards());
    setFirstCard(null);
    setSecondCard(null);
    setTurns(0);
  };

  return (
    <div className="min-h-screen bg-purple-50 text-center p-4">
      <h1 className="text-4xl font-bold text-purple-700 mb-4">🧠 Memory Game</h1>
      <button
        className="bg-purple-500 text-white py-2 px-4 rounded mb-4 hover:bg-purple-600"
        onClick={restartGame}
      >
        🔁 Restart
      </button>
      <div className="grid grid-cols-4 gap-4 justify-center max-w-md mx-auto">
        {cards.map((card) => (
          <Card
            key={card.uuid}
            card={card}
            flipped={
              card === firstCard || card === secondCard || card.matched
            }
            onClick={handleCardClick}
            disabled={disabled}
          />
        ))}
      </div>
      <p className="mt-4 text-lg">Turns: {turns}</p>
    </div>
  );
}
