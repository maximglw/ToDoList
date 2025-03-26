const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;
const DATA_FILE = "todos.json";

app.use(cors());
app.use(express.json());

app.use(express.static("../"));

// Lade vorhandene To-Do-Daten
function loadTodos() {
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    } catch (error) {
        return {}; // Falls Datei nicht existiert oder fehlerhaft ist
    }
}

// Speichert die To-Dos in einer JSON-Datei
function saveTodos(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

// API: To-Dos für einen Benutzer abrufen
app.get("/todos/:username", (req, res) => {
    const todos = loadTodos();
    res.json(todos[req.params.username] || []);
});

// API: To-Dos für einen Benutzer speichern
app.post("/todos/:username", (req, res) => {
    const todos = loadTodos();
    todos[req.params.username] = req.body.tasks;
    saveTodos(todos);
    res.json({ message: "To-Dos gespeichert!" });
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
