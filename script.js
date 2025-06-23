const kitty = document.getElementById("kitty");
const cakesContainer = document.getElementById("cakes-container");
const counter = document.getElementById("counter");
const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popup-title");
const popupText = document.getElementById("popup-text");

const walkSound = document.getElementById("walkSound");
const eatSound = document.getElementById("eatSound");
const popupSound = document.getElementById("popupSound");

const introScreen = document.getElementById("intro-screen");
const gameContainer = document.getElementById("game-container");
const playerNameInput = document.getElementById("player-name-input");

let cakeCount = 0;
let cakes = [];
let frame = 0;
const totalFrames = 4;

// Start Game
function startGame() {
  const name = playerNameInput.value.trim();
  if (!name) {
    alert("Please enter your name to start!");
    return;
  }

  introScreen.classList.add("hidden");
  gameContainer.classList.remove("hidden");

  createCakes();
  createClouds();
}

// Create 15 cakes randomly
function createCakes() {
  for (let i = 0; i < 15; i++) {
    const cake = document.createElement("img");
    cake.src = "images/cake.png";
    cake.classList.add("cake");
    cake.style.top = Math.random() * 90 + "%";
    cake.style.left = Math.random() * 90 + "%";
    cakesContainer.appendChild(cake);
    cakes.push(cake);
  }
}

// Move Hello Kitty
document.addEventListener("keydown", (e) => {
  const step = 10;
  let moved = false;
  let x = kitty.offsetLeft;
  let y = kitty.offsetTop;

  if (e.key === "ArrowLeft") {
    x -= step;
    moved = true;
  }
  if (e.key === "ArrowRight") {
    x += step;
    moved = true;
  }
  if (e.key === "ArrowUp") {
    y -= step;
    moved = true;
  }
  if (e.key === "ArrowDown") {
    y += step;
    moved = true;
  }

  if (moved) {
    kitty.style.left = `${x}px`;
    kitty.style.top = `${y}px`;

    walkSound.currentTime = 0;
    walkSound.play();

    animateKitty();
    checkCollision();
  }
});

// Animate Kitty Walk
function animateKitty() {
  frame = (frame + 1) % totalFrames;
  kitty.style.backgroundPosition = `-${frame * 80}px 0`;
}

// Collision detection with cakes
function checkCollision() {
  const kittyBox = kitty.getBoundingClientRect();

  for (let i = cakes.length - 1; i >= 0; i--) {
    const cake = cakes[i];
    const cakeBox = cake.getBoundingClientRect();

    if (
      kittyBox.left < cakeBox.right &&
      kittyBox.right > cakeBox.left &&
      kittyBox.top < cakeBox.bottom &&
      kittyBox.bottom > cakeBox.top
    ) {
      cake.remove();
      cakes.splice(i, 1);
      cakeCount++;
      counter.textContent = `Cakes: ${cakeCount}`;

      eatSound.currentTime = 0;
      eatSound.play();

      if (cakeCount === 15) {
        celebrate();
      }
    }
  }
}

// Celebration with confetti and popup
function celebrate() {
  popupSound.currentTime = 0;
  popupSound.play();
  popup.classList.remove("hidden");

  const name = playerNameInput.value.trim() || "friend";
  popupTitle.textContent = `🎉🎂 Happy Birthday, ${name}! 🎂🎉`;
  popupText.textContent = `You helped Hello Kitty eat all the cakes!`;

  confetti({
    particleCount: 300,
    spread: 120,
    origin: { y: 0.6 }
  });
}

// Reset the game
function resetGame() {
  window.location.reload();
}

// Floating clouds
function createClouds() {
  const cloudsContainer = document.getElementById("clouds-container");
  const cloudCount = 5;

  for (let i = 0; i < cloudCount; i++) {
    const cloud = document.createElement("div");
    cloud.classList.add("cloud");
    cloud.style.top = (10 + i * 20) + "px";
    cloud.style.animationDuration = (30 + Math.random() * 30) + "s";
    cloud.style.animationDelay = (i * 6) + "s";
    cloud.style.left = `${-150 - i * 200}px`;
    cloudsContainer.appendChild(cloud);
  }
}
