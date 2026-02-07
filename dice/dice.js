const rollBtn = document.getElementById("rollBtn");
const diceDisplay = document.getElementById("diceDisplay");
const character = document.getElementById("character");
const progressText = document.getElementById("progressText");

let currentSteps = 0;
const goal = 50;
const mountainHeight = 320; // visual height for climbing

function rollDice() {
    const dice = Math.floor(Math.random() * 6) + 1;

    diceDisplay.textContent = dice;
    diceDisplay.style.transform = "rotate(360deg)";

    setTimeout(() => {
        diceDisplay.style.transform = "rotate(0deg)";
    }, 300);

    currentSteps += dice;

    if (currentSteps >= goal) {
        currentSteps = goal;
        moveCharacter();
        levelComplete();
    } else {
        moveCharacter();
        progressText.textContent = `You climbed ${currentSteps} steps ❤️`;
    }
}

function moveCharacter() {
    const percentage = currentSteps / goal;
    const climbHeight = percentage * mountainHeight;
    character.style.bottom = climbHeight + "px";
}

function levelComplete() {
    rollBtn.disabled = true;

    progressText.textContent = "You climbed into my heart ❤️✨";

    character.style.transform = "translateX(-50%) scale(1.2)";

    setTimeout(() => {
        window.location.href = "../next-level/next.html"; 
    }, 3000);
}
    
rollBtn.addEventListener("click", rollDice);
