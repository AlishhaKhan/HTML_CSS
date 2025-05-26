const cards = [
  { id: 1, image: "🐶" },
  { id: 2, image: "🐱" },
  { id: 3, image: "🐼" },
  { id: 4, image: "🐸" },
  { id: 5, image: "🦁" },
  { id: 6, image: "🐷" },
];

// Duplicate and shuffle
export const generateCards = () => {
  const duplicated = [...cards, ...cards].map((card, index) => ({
    ...card,
    uuid: index + 1,
    matched: false,
  }));
  return duplicated.sort(() => Math.random() - 0.5);
};
