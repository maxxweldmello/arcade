const correctPassword = "forever";

document.getElementById("passwordForm").addEventListener("submit", function(e) {
    e.preventDefault(); // prevent page reload
    checkPassword();
});

function checkPassword() {
    const input = document.getElementById("password-input").value;
    const message = document.getElementById("message");

    if (input === correctPassword) {
        message.style.color = "#22ca28ff";
        message.textContent = "Access Granted ❤️";

        document.querySelector("button").disabled = true;

        setTimeout(() => {
            window.location.href = "chalkboard/chalkboard.html";
        }, 1500);

    } else {
        message.style.color = "red";
        message.textContent = "Access Denied ❌";
    }
}
