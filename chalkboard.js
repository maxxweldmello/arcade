// ===============================
// CONFIGURATION
// ===============================
const GAME_TIME_SECONDS = 60;
const TIMER_INTERVAL_MS = 1000;
const WELCOME_DELAY_MS = 3000;
const LEVEL_REDIRECT_DELAY_MS = 3000;
const SCORE_INCREMENT = 10;

// ===============================
// DATA
// ===============================
const words = ["LOVE"];
let availableWords = [...words];

let currentWord = "";
let score = 0;
let timeLeft = GAME_TIME_SECONDS;
let timer;

// ===============================
// DOM REFERENCES
// ===============================
const scrambledWordEl = document.getElementById("scrambledWord");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const answerEl = document.getElementById("answer");
const gameOverEl = document.getElementById("gameOver");
const submitBtn = document.getElementById("submitBtn");
const welcomeScreen = document.getElementById("welcomeScreen");
const gameWrapper = document.getElementById("gameWrapper");

// ===============================
// UTIL FUNCTIONS
// ===============================
function scramble(word) {
    return word.split('').sort(() => Math.random() - 0.5).join('');
}

function adjustFontSize() {
    const containerWidth = document.querySelector(".game-wrapper").offsetWidth;
    let fontSize = 52;

    scrambledWordEl.style.fontSize = fontSize + "px";

    while (scrambledWordEl.scrollWidth > containerWidth - 20 && fontSize > 20) {
        fontSize -= 2;
        scrambledWordEl.style.fontSize = fontSize + "px";
    }
}

// ===============================
// GAME LOGIC
// ===============================
function newWord() {

    if (availableWords.length === 0) {
        levelComplete();
        return;
    }

    const randomIndex = Math.floor(Math.random() * availableWords.length);
    currentWord = availableWords[randomIndex];
    availableWords.splice(randomIndex, 1);

    scrambledWordEl.textContent = scramble(currentWord);
    adjustFontSize();
}

function checkAnswer() {
    if (answerEl.value.toUpperCase() === currentWord) {
        score += SCORE_INCREMENT;
        scoreEl.textContent = score;
        answerEl.value = "";
        newWord();
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, TIMER_INTERVAL_MS);
}

function endGame() {
    clearInterval(timer);

    scrambledWordEl.textContent = "";
    answerEl.style.display = "none";
    submitBtn.style.display = "none";

    gameOverEl.classList.remove("hidden");

    document.getElementById("resultTitle").textContent = "Game Over ❤️";
    document.getElementById("resultScore").textContent = `Final Score: ${score}`;
    document.getElementById("resultMessage").textContent = "You can do better, my champion 😌";

    document.getElementById("retryBtn").classList.remove("hidden");
    document.getElementById("nextLevelBtn").classList.add("hidden");
}

function levelComplete() {
    clearInterval(timer);

    scrambledWordEl.textContent = "";
    answerEl.style.display = "none";
    submitBtn.style.display = "none";

    gameOverEl.classList.remove("hidden");

    document.getElementById("resultTitle").textContent = "Level 1 Complete ❤️";
    document.getElementById("resultScore").textContent = `Final Score: ${score}`;
    document.getElementById("resultMessage").textContent = "";

    document.getElementById("retryBtn").classList.add("hidden");
    document.getElementById("nextLevelBtn").classList.add("hidden");

    setTimeout(() => {
        window.location.href = "../walktotheheart/walktotheheart.html";
    }, LEVEL_REDIRECT_DELAY_MS);
}

function resetGame() {
    clearInterval(timer);

    score = 0;
    timeLeft = GAME_TIME_SECONDS;
    availableWords = [...words];

    scoreEl.textContent = score;
    timeEl.textContent = timeLeft;

    // Completely reset game over section
    gameOverEl.classList.add("hidden");

    document.getElementById("resultTitle").textContent = "";
    document.getElementById("resultScore").textContent = "";
    document.getElementById("resultMessage").textContent = "";

    document.getElementById("retryBtn").classList.add("hidden");
    document.getElementById("nextLevelBtn").classList.add("hidden");

    answerEl.style.display = "block";
    submitBtn.style.display = "block";

    answerEl.value = "";
    answerEl.focus();

    startGame();
}

function startGame() {
    newWord();
    startTimer();
}

// ===============================
// EVENTS
// ===============================
submitBtn.addEventListener("click", checkAnswer);

answerEl.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        checkAnswer();
    }
});

document.getElementById("retryBtn").addEventListener("click", resetGame);

document.getElementById("nextLevelBtn").addEventListener("click", () => {
    window.location.href = "../walktotheheart/walktotheheart.html";
});

// ===============================
// WELCOME LOGIC
// ===============================
window.addEventListener("load", () => {
    setTimeout(() => {
        welcomeScreen.style.display = "none";
        gameWrapper.classList.remove("hidden");
        startGame();
    }, WELCOME_DELAY_MS);
});
