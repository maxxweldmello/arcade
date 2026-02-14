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
    { boy: "Darluuu. Mi varti hay. Varti yeee. But aaram shi.", girl: "Sweetuuu. Tuje nana chi tang. Awre varti kaisa chadlas. Pek ailu." },
    { boy: "Aaya first challange solved jhaila.", girl: "Hehe, ha solve jhaila." },
    { boy: "Sambhalun Babuu", girl: "Ha Babu, sambhalun shish" },
    { boy: "Aaya maji baby tar kawri smart hay.", girl: "Ofc darling mi te smart hay. hehe." },
    { boy: "Babu begin yeee...", girl: "Ha babu aata udun tar nai yeu shaktu." },
    { boy: "Darluuu. Ye last challange hay. All the best.", girl: "Aayaaa. Bara bara." },
    { boy: "Aayaaa Babu pochliii! 😘", girl: "Aayaaaa Baby mi pochluuu! 🥰" }
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
    // await new Promise(r => setTimeout(r, 2500));

    // // Fade out both
    // boyBubble.classList.remove("show");
    // girlBubble.classList.remove("show");

    // // Wait for fade animation to finish
    // await new Promise(r => setTimeout(r, 400));

    // boyBubble.classList.add("hidden");
    // girlBubble.classList.add("hidden");

    // dialogueActive = false;

    // Wait for user click to close dialogue
    await waitForClick();

    // Fade out both
    boyBubble.classList.remove("show");
    girlBubble.classList.remove("show");

    await new Promise(r => setTimeout(r, 400));

    boyBubble.classList.add("hidden");
    girlBubble.classList.add("hidden");

    dialogueActive = false;

}

function waitForClick() {
    return new Promise((resolve) => {

        function handleClick() {
            document.removeEventListener("click", handleClick);
            resolve();
        }

        // Small delay so it doesn’t instantly close
        setTimeout(() => {
            document.addEventListener("click", handleClick);
        }, 100);
    });
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

    showDialogue(currentStep);

    if (currentStep === steps.length - 1) {
        setTimeout(async () => {

            await new Promise(r => setTimeout(r, 1500)); // small emotional pause

            window.location.href = "finalmessage.html";

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
            if (currentStep > 0) {
                showDialogue(currentStep);
            }
        }, 400);

    } else {
        showDialogue(0);
    }
};
