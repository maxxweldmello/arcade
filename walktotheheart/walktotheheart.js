const player = document.getElementById("player");
const boy = document.getElementById("boy");
const jumpBtn = document.getElementById("jumpBtn");
const joystick = document.getElementById("joystick");
const stick = document.getElementById("stick");

/* Platform Steps */
const steps = [
    { x: 50, y: 10 },
    { x: 72, y: 32 },
    { x: 40, y: 40 },
    { x: 68, y: 50 },
    { x: 36, y: 58 },
    { x: 65, y: 66 },
    { x: 32, y: 73 },
    { x: 40, y: 87 }
];

let x = 50;
let y = 10;

let velocityY = 0;
let gravity = -0.4;
let jumpPower = 6;   // reduced jump height

let moveX = 0;
let moveY = 0;

let isOnPlatform = true;

/* Joystick Logic */
let dragging = false;

joystick.addEventListener("touchstart", () => dragging = true);
document.addEventListener("touchend", () => {
    dragging = false;
    stick.style.left = "30px";
    stick.style.top = "30px";
    moveX = 0;
});

document.addEventListener("touchmove", (e) => {
    if (!dragging) return;

    const rect = joystick.getBoundingClientRect();
    const touch = e.touches[0];

    let dx = touch.clientX - rect.left - 60;
    let dy = touch.clientY - rect.top - 60;

    const distance = Math.sqrt(dx*dx + dy*dy);
    const max = 40;

    if (distance > max) {
        dx = dx * max / distance;
        dy = dy * max / distance;
    }

    stick.style.left = (30 + dx) + "px";
    stick.style.top = (30 + dy) + "px";

    moveX = dx / max;   // normalized movement
});

/* Physics Update */
function update() {

    x += moveX * 0.8;   // reduced sensitivity

    velocityY += gravity;
    y += velocityY;

    /* Platform landing check */
    if (velocityY <= 0) {
        for (let step of steps) {
            if (
                Math.abs(x - step.x) < 5 &&
                Math.abs(y - step.y) < 3
            ) {
                y = step.y;
                velocityY = 0;
                isOnPlatform = true;
            }
        }
    }

    /* Fall reset */
    if (y < 0) {
        x = 50;
        y = 10;
        velocityY = 0;
        isOnPlatform = true;
    }

    /* Win */
    const final = steps[steps.length - 1];
    if (Math.abs(x - final.x) < 5 && Math.abs(y - final.y) < 3) {
        setTimeout(() => {
            alert("You reached him ❤️✨");
        }, 200);
    }

    player.style.left = x + "%";
    player.style.bottom = y + "%";

    requestAnimationFrame(update);
}

update();

/* Jump */
jumpBtn.addEventListener("click", () => {
    if (isOnPlatform) {
        velocityY = jumpPower;
        isOnPlatform = false;
    }
});
