// ==========================
// CONFIG
// ==========================
const GAME_DURATION = 30;
const FEAR_POP_INTERVAL = 800;
const GRID_SIZE = 9;
const SCORE_INCREMENT = 10;
const REDIRECT_DELAY_MS = 3000;
const REDIRECT_URL = "walktotheheart.html";

// ==========================
// DATA
// ==========================
const fears = [
    "FAIL",
    "DOUBT",
    "FEAR",
    "INSECURE",
    "ALONE",
    "OVERTHINK",
    "ANXIETY"
];

let score = 0;
let timeLeft = GAME_DURATION;
let activeHole = null;
let gameTimer = null;
let popTimer = null;

// ==========================
// DOM
// ==========================
const grid = document.getElementById("grid");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const gameOverEl = document.getElementById("gameOver");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");

// ==========================
// GRID SETUP
// ==========================
function createGrid() {
    grid.innerHTML = "";

    for (let i = 0; i < GRID_SIZE; i++) {
        const hole = document.createElement("div");
        hole.classList.add("hole");
        hole.addEventListener("click", () => whack(hole));
        grid.appendChild(hole);
    }
}

// ==========================
// GAME LOGIC
// ==========================
function randomHole() {
    const holes = document.querySelectorAll(".hole");
    const index = Math.floor(Math.random() * holes.length);
    return holes[index];
}

function popFear() {
    if (activeHole) {
        activeHole.classList.remove("active");
        activeHole.textContent = "";
    }

    const hole = randomHole();
    const randomFear = fears[Math.floor(Math.random() * fears.length)];

    hole.textContent = randomFear;
    hole.classList.add("active");

    activeHole = hole;
}

function whack(hole) {
    if (!hole.classList.contains("active")) return;

    score += SCORE_INCREMENT;
    scoreEl.textContent = score;

    hole.classList.remove("active");
    hole.textContent = "";
    activeHole = null;
}

// ==========================
// START GAME
// ==========================
function startGame() {
    clearInterval(gameTimer);
    clearInterval(popTimer);

    score = 0;
    timeLeft = GAME_DURATION;
    activeHole = null;

    scoreEl.textContent = score;
    timeEl.textContent = timeLeft;

    grid.classList.remove("hidden");
    gameOverEl.classList.add("hidden");

    createGrid();
    popFear();

    popTimer = setInterval(popFear, FEAR_POP_INTERVAL);

    gameTimer = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// ==========================
// END GAME
// ==========================
function endGame() {
    clearInterval(gameTimer);
    clearInterval(popTimer);
    

    if (activeHole) {
        activeHole.classList.remove("active");
        activeHole.textContent = "";
        activeHole = null;
    }

    grid.classList.add("hidden");

    resultTitle.textContent = "Congratulations! 😘";
    resultMessage.textContent = `You conquered ${score / SCORE_INCREMENT} fears. 💜  Every tap was courage in action.`;


    gameOverEl.classList.remove("hidden");

    setTimeout(() => {
        window.location.href = REDIRECT_URL;
    }, REDIRECT_DELAY_MS);
}

// ==========================
// AUTO START
// ==========================
// window.addEventListener("load", startGame);

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

    setTimeout(() => {
        welcomeScreen.style.display = "none";
        gameContainer.classList.remove("hidden");
        startGame();
    }, delay + 1500);
});

// // Fix grid disappearing when using back button
// window.addEventListener("pageshow", () => {
//     startGame();
// });
