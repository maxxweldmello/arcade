const correctPassword = "forever";

function checkPassword() {
    const input = document.getElementById("password-input").value;
    const message = document.getElementById("message");

    if (input === correctPassword) {
        message.style.color = "#00ffcc";
        message.textContent = "Access Granted...";
        
        setTimeout(() => {
            document.getElementById("password-screen").classList.add("hidden");
            document.getElementById("success-screen").classList.remove("hidden");
        }, 1000);
    } else {
        message.style.color = "red";
        message.textContent = "Access Denied!";
    }
}
