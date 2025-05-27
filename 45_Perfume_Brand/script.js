// Dark/Light mode toggle
const toggleBtn = document.getElementById("modeToggle");
toggleBtn.addEventListener("click", () => {
  const htmlTag = document.documentElement;
  htmlTag.dataset.theme = htmlTag.dataset.theme === "light" ? "dark" : "light";
});

// Cart functionality
let cartCount = 0;
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartCountDisplay = document.getElementById("cartCount");

addToCartButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    cartCount++;
    cartCountDisplay.textContent = cartCount;
  });
});
