const words = [
    "LOVE"
];

let availableWords = [...words];


let currentWord = "";
let score = 0;
let timeLeft = 60;
let timer;

const scrambledWordEl = document.getElementById("scrambledWord");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const answerEl = document.getElementById("answer");
const gameOverEl = document.getElementById("gameOver");
const submitBtn = document.getElementById("submitBtn");

function scramble(word) {
    return word.split('').sort(() => Math.random() - 0.5).join('');
}

function newWord() {

    if (availableWords.length === 0) {
        levelComplete();
        return;
    }

    const randomIndex = Math.floor(Math.random() * availableWords.length);
    currentWord = availableWords[randomIndex];
    availableWords.splice(randomIndex, 1);

    const scrambled = scramble(currentWord);
    scrambledWordEl.textContent = scrambled;

    adjustFontSize();
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

function checkAnswer() {
    if (answerEl.value.toUpperCase() === currentWord) {
        score += 10;
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
    }, 1000);
}

function endGame() {
    clearInterval(timer);

    scrambledWordEl.textContent = "";
    answerEl.disabled = true;
    submitBtn.disabled = true;

    gameOverEl.style.display = "block";

    document.getElementById("resultTitle").textContent = "Game Over ❤️";
    document.getElementById("resultScore").textContent = `Final Score: ${score}`;
    document.getElementById("resultMessage").textContent = "You can do better, my champion 😌";

    document.getElementById("retryBtn").style.display = "inline-block";
    document.getElementById("nextLevelBtn").style.display = "none";
}

function levelComplete() {
    clearInterval(timer);

    scrambledWordEl.textContent = "";
    answerEl.disabled = true;
    submitBtn.disabled = true;

    gameOverEl.style.display = "block";

    document.getElementById("resultTitle").textContent = "Level 1 Complete ❤️";
    document.getElementById("resultScore").textContent = `Final Score: ${score}`;
    document.getElementById("resultMessage").textContent = "";

    document.getElementById("retryBtn").style.display = "none";
    document.getElementById("nextLevelBtn").style.display = "inline-block";
}

function resetGame() {
    score = 0;
    timeLeft = 10;
    availableWords = [...words];

    scoreEl.textContent = score;
    timeEl.textContent = timeLeft;

    answerEl.disabled = false;
    submitBtn.disabled = false;
    answerEl.value = "";

    gameOverEl.style.display = "none";

    startGame();
}

function startGame() {
    newWord();
    startTimer();
}

// Event listeners
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

// Welcome delay logic
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("welcomeScreen").style.display = "none";
        document.getElementById("gameWrapper").style.display = "block";
        startGame();
    }, 3000);
});


