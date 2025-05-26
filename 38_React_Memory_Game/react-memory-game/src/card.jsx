import React from "react";

export default function Card({ card, onClick, flipped, disabled }) {
  return (
    <div
      className={`cursor-pointer w-20 h-20 flex items-center justify-center border rounded-lg text-3xl transition duration-300 ${
        flipped ? "bg-purple-200" : "bg-gray-300"
      }`}
      onClick={() => !disabled && onClick(card)}
    >
      {flipped || card.matched ? card.image : "❓"}
    </div>
  );
}
