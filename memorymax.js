// ===============================
// CONFIG
// ===============================
const PREVIEW_TIME_MS = 2000;
const REDIRECT_DELAY_MS = 3000;
const REDIRECT_URL = "walktotheheart.html";
const STORAGE_KEY = "memoryMaxCompleted";

// ===============================
// DATA
// ===============================
const symbols = [
    "DARLING", 
    "SWEETHEART", "BABY", "SHOKRI",
    "BABU", "DARLU", "CUTIE PIE", "SWEETIE PIE"
];

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCount = 0;

// ===============================
// DOM
// ===============================
const grid = document.getElementById("grid");
const messageOverlay = document.getElementById("message");
const messageBox = document.querySelector(".message-box");

// ===============================
// INITIALIZE
// ===============================
function initGame() {
    const duplicated = [...symbols, ...symbols];
    cards = shuffle(duplicated);

    grid.innerHTML = "";
    matchedCount = 0;
    firstCard = null;
    secondCard = null;
    lockBoard = true;

    cards.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.textContent = symbol;
        card.addEventListener("click", () => handleClick(card));
        grid.appendChild(card);
    });

    // Preview phase
    setTimeout(() => {
        document.querySelectorAll(".card").forEach(card => {
            card.textContent = "";
        });
        lockBoard = false;
    }, PREVIEW_TIME_MS);
}

// ===============================
// CARD LOGIC
// ===============================
function handleClick(card) {
    if (lockBoard) return;
    if (card.classList.contains("matched")) return;
    if (card === firstCard) return;

    card.textContent = card.dataset.symbol;
    card.classList.add("revealed");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;

    checkMatch();
}

function checkMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matchedCount += 2;
        resetTurn();

        if (matchedCount === cards.length) {
            levelComplete();
        }
    } else {
        setTimeout(() => {
            firstCard.textContent = "";
            secondCard.textContent = "";
            firstCard.classList.remove("revealed");
            secondCard.classList.remove("revealed");
            resetTurn();
        }, 800);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// ===============================
// COMPLETE LEVEL
// ===============================
function levelComplete() {
    lockBoard = true;

    messageBox.textContent = "Looks like the Smart Girl passed the memory test too ❤️";
    messageOverlay.classList.remove("hidden");

    localStorage.setItem(STORAGE_KEY, "true");

    setTimeout(() => {
        window.location.href = REDIRECT_URL;
    }, REDIRECT_DELAY_MS);
}

// ===============================
// UTIL
// ===============================
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// ===============================
// START
// ===============================
window.addEventListener("load", () => {

    const welcomeScreen = document.getElementById("welcomeScreen");
    const gameContainer = document.querySelector(".game-container");
    const welcomeLines = document.querySelectorAll(".welcome-line");

    let delay = 0;

    welcomeLines.forEach((line) => {
        setTimeout(() => {
            line.classList.add("visible");
        }, delay);
        delay += 2000;
    });

    // After welcome animation
    setTimeout(() => {
        welcomeScreen.style.display = "none";
        gameContainer.classList.remove("hidden");
        initGame();
    }, delay + 1500);
});
