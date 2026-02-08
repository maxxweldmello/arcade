const player = document.getElementById("player");
const boy = document.getElementById("boy");
const jumpBtn = document.getElementById("jumpBtn");

const boyBubble = document.getElementById("boyBubble");
const girlBubble = document.getElementById("girlBubble");
const boyText = document.getElementById("boyText");
const girlText = document.getElementById("girlText");

let currentStep = 0;
let isJumping = false;
let dialogueActive = false;

/* STEP POSITIONS */
const steps = [
    { x: 50, y: 13 },
    { x: 72, y: 30 },
    { x: 40, y: 38 },
    { x: 68, y: 49 },
    { x: 36, y: 56 },
    { x: 65, y: 64 },
    { x: 32, y: 71 },
    { x: 42, y: 86 }
];

/* DIALOGUES */
const dialogues = [
    { boy: "Welcome my love 💜", girl: "I’m coming to you." },
    { boy: "The climb won’t be easy.", girl: "Nothing is hard when it’s you." },
    { boy: "Careful now...", girl: "I trust myself." },
    { boy: "You’re glowing tonight.", girl: "Because you’re waiting." },
    { boy: "Almost there...", girl: "I can see you clearly now." },
    { boy: "Just a little more.", girl: "I won’t stop." },
    { boy: "Final jump!", girl: "Catch me ❤️" }
];

/* Place player */
function placePlayer(index) {
    player.style.left = steps[index].x + "%";
    player.style.bottom = steps[index].y + "%";
}
placePlayer(0);

/* FIX: Explicitly set boy bottom so bubble works */
boy.style.left = "48%";
boy.style.bottom = "86%";

/* Simple typewriter */
function typeText(element, text) {
    return new Promise((resolve) => {
        element.innerHTML = "";
        let i = 0;

        const interval = setInterval(() => {
            element.innerHTML += text.charAt(i);
            i++;

            if (i >= text.length) {
                clearInterval(interval);
                resolve(); // 🔥 tells us typing finished
            }
        }, 25);
    });
}

/* Show Dialogue (Instant) */
async function showDialogue(stepIndex) {
    if (!dialogues[stepIndex]) return;

    dialogueActive = true;
    const convo = dialogues[stepIndex];

    // Position bubbles
    boyBubble.style.left = boy.style.left;
    boyBubble.style.bottom = boy.style.bottom;

    girlBubble.style.left = player.style.left;
    girlBubble.style.bottom = player.style.bottom;

    // --- BOY FIRST ---
    boyBubble.classList.remove("hidden");
    boyBubble.classList.add("show");
    boyText.innerHTML = "";

    await typeText(boyText, convo.boy);

    // Romantic pause
    await new Promise(r => setTimeout(r, 600));

    // --- GIRL AFTER BOY FINISHES ---
    girlBubble.classList.remove("hidden");
    girlBubble.classList.add("show");
    girlText.innerHTML = "";

    await typeText(girlText, convo.girl);

    // Stay visible for a moment
    await new Promise(r => setTimeout(r, 2500));

    // Fade out both
    boyBubble.classList.remove("show");
    girlBubble.classList.remove("show");

    // Wait for fade animation to finish
    await new Promise(r => setTimeout(r, 400));

    boyBubble.classList.add("hidden");
    girlBubble.classList.add("hidden");

    dialogueActive = false;
}

/* Jump Logic */
function jumpToNext() {
    if (isJumping || dialogueActive) return;
    if (currentStep >= steps.length - 1) return;

    isJumping = true;
    currentStep++;

    const target = steps[currentStep];

    player.style.transition = "bottom 0.25s ease-out";
    player.style.bottom = (target.y + 8) + "%";

    setTimeout(() => {
        player.style.transition = "all 0.35s ease-in";
        player.style.left = target.x + "%";
        player.style.bottom = target.y + "%";
    }, 250);

setTimeout(() => {
    isJumping = false;

    // 🧠 Check if this step triggers a puzzle
    if (currentStep === 1) {
        localStorage.setItem("resumeStep", currentStep);
        window.location.href = "chalkboard.html";
        return;
    }

    if (currentStep === 3) {
        localStorage.setItem("resumeStep", currentStep);
        window.location.href = "memorymax.html";
        return;
    }

    if (currentStep === 6) {
        localStorage.setItem("resumeStep", currentStep);
        window.location.href = "whackafear.html";
        return;
    }

    showDialogue(currentStep - 1);

    if (currentStep === steps.length - 1) {
        setTimeout(() => {
            alert("You reached him ❤️✨");
        }, 500);
    }

}, 600);
}

jumpBtn.addEventListener("click", jumpToNext);

/* Opening dialogue */
window.onload = () => {

    const savedStep = localStorage.getItem("resumeStep");

    if (savedStep !== null) {
        currentStep = parseInt(savedStep);
        placePlayer(currentStep);
        localStorage.removeItem("resumeStep");

        // Optional: show dialogue again after returning
        setTimeout(() => {
            showDialogue(currentStep - 1);
        }, 400);

    } else {
        showDialogue(0);
    }
};
