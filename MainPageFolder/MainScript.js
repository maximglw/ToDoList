const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let currentUser = localStorage.getItem("currentUser");

// Prüfe, ob localStorage unterstützt wird
if (typeof(Storage) !== "undefined") {
    console.log("localStorage is supported.");
    if (!currentUser) {
        console.log("No user logged in, redirecting to login page...");
        window.location.href = "../index.html"; // Zur Login-Seite umleiten
    } else {
        console.log("Current User from localStorage:", currentUser);
    }
} else {
    alert("localStorage wird nicht unterstützt. Bitte aktiviere localStorage oder verwende einen anderen Browser.");
}

function addTask() {
    if (inputBox.value === '') {
        alert("Eingabe ist leer!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    let tasks = [];
    document.querySelectorAll("#list-container li").forEach(li => {
        tasks.push({ text: li.textContent.slice(0, -1), checked: li.classList.contains("checked") });
    });
    localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(tasks));
}

function showTask() {
    let tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || [];
    listContainer.innerHTML = "";
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = task.text;
        if (task.checked) {
            li.classList.add("checked");
        }
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        listContainer.appendChild(li);
    });
}

showTask();
