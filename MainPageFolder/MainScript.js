const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
    window.location.href = "../index.html";
}

// Lade To-Dos vom Server
async function loadTasks() {
    try {
        let response = await fetch(`http://localhost:3000/todos/${encodeURIComponent(currentUser)}`);
        let tasks = await response.json();
        listContainer.innerHTML = "";
        tasks.forEach(task => {
            let li = document.createElement("li");
            li.textContent = task.text;
            if (task.checked) {
                li.classList.add("checked");
            }
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
            listContainer.appendChild(li);
        });
    } catch (error) {
        console.error("Fehler beim Laden der To-Dos:", error);
    }
}

// Speichere To-Dos auf dem Server
async function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#list-container li").forEach(li => {
        tasks.push({ text: li.textContent.slice(0, -1), checked: li.classList.contains("checked") });
    });

    try {
        await fetch(`http://localhost:3000/todos/${currentUser}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tasks })
        });
    } catch (error) {
        console.error("Fehler beim Speichern der To-Dos:", error);
    }
}

function addTask() {
    if (inputBox.value === '') {
        alert("Eingabe ist leer!");
        return;
    }
    let li = document.createElement("li");
    li.textContent = inputBox.value;
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    listContainer.appendChild(li);
    inputBox.value = "";
    saveTasks();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
    saveTasks();
}, false);

loadTasks();
