const lines = document.querySelectorAll(".line");
let delay = 0;

lines.forEach((line, index) => {
    setTimeout(() => {
        line.classList.add("visible");
    }, delay);

    delay += 2000; // time between sentences
});

// After all lines appear, redirect
setTimeout(() => {
    window.location.href = "../walktotheheart/walktotheheart.html";
}, delay + 1500);
