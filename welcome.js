const lines = document.querySelectorAll(".line");
let delay = 0;

lines.forEach((line) => {
    setTimeout(() => {
        line.classList.add("visible");
    }, delay);

    delay += 2500; // slower line reveal
});

setTimeout(() => {
    window.location.href = "walktotheheart.html";
}, delay + 5000); // longer emotional pause
