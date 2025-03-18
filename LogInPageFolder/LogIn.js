document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Verhindert das Neuladen der Seite

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let messageElement = document.getElementById("message");

    try {
        let response = await fetch("users.json");
        let users = await response.json();

        let user = users.find(u => u.username === username && u.password === password);

        if (user) {
            messageElement.textContent = "Login erfolgreich! Weiterleitung...";

            // Speichere den Benutzernamen im localStorage
            localStorage.setItem("currentUser", username);
            console.log("User logged in:", username);

            setTimeout(() => {
                window.location.href = "../MainPage/Main.html"; // Zielseite anpassen
            }, 1500);
        } else {
            messageElement.textContent = "Falscher Benutzername oder Passwort!";
            messageElement.style.color = "red";
        }
    } catch (error) {
        console.error("Fehler beim Laden der Benutzerdatei:", error);
    }
});
