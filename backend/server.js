//     Importiert das express-Modul,
//     ein Framework für Node.js,
//     um HTTP-Server und Routen zu erstellen
import express from "express";

//     Importiert das cors-Modul,
//     um Cross-Origin Resource Sharing zu ermöglichen,
//     damit das Frontend Anfragen an den Server senden kann
import cors from "cors";

//     Importiert das fs-Modul (File System),
//     um auf das Dateisystem zuzugreifen und
//     Dateien zu lesen oder zu schreiben
import fs from "fs";

//     Erstellt eine neue Express-Anwendung (Server),
//     die HTTP-Anfragen behandelt
const server = express();

//     Definiert die Portnummer,
//     auf der der Server lauschen wird
const PORT = 4000;

//     Middleware: Erlaubt dem Server,
//     JSON-Daten im Body von Anfragen automatisch zu parsen
server.use(express.json());

//     Middleware: Aktiviert CORS,
//     um Anfragen von externen Domains (wie dem Frontend) zu erlauben
server.use(cors());

//     Funktion zum Laden der Todos aus der JSON-Datei
const loadTodos = () => {
  try {
    //     Liest synchron den Inhalt der Datei "todos.json" und
    //     speichert ihn als String in der Variablen "data"
    const data = fs.readFileSync("todos.json", "utf8");

    //     Parst den JSON-String "data" in ein JavaScript-Objekt und
    //     gibt dieses Objekt zurück
    return JSON.parse(data);
  } catch (err) {
    //     Falls ein Fehler beim Lesen oder Parsen der Datei auftritt,
    //     wird eine Fehlermeldung in der Konsole angezeigt
    console.error("Fehler beim Lesen der todos.json:", err);

    //     Gibt ein leeres Array zurück,
    //     falls die Datei nicht gelesen werden kann
    return [];
  }
};

//     Funktion zum Speichern der Todos in die JSON-Datei
const saveTodos = (todos) => {
  try {
    //     Schreibt die Todos als JSON-String in die Datei "todos.json",
    //     formatiert mit 2 Leerzeichen (zur besseren Lesbarkeit)
    fs.writeFileSync("todos.json", JSON.stringify(todos, null, 2));

    //     Gibt eine Erfolgsmeldung in der Konsole aus,
    //     wenn das Speichern erfolgreich war
    console.log("Todos erfolgreich gespeichert.");
  } catch (err) {
    //     Falls ein Fehler beim Speichern auftritt,
    //     wird eine Fehlermeldung in der Konsole angezeigt
    console.error("Fehler beim Speichern der todos.json:", err);
  }
};

//     GET-Route zum Abrufen der Todos
server.get("/todos", (req, res) => {
  //     Gibt eine Meldung in der Konsole aus,
  //     wenn eine Anfrage an die "/todos"-Route gesendet wird
  console.log("request was made: " + req.url);

  //     Lädt die Todos aus der JSON-Datei mithilfe der "loadTodos"-Funktion
  const todos = loadTodos();

  //     Sendet die geladenen Todos als JSON-Antwort an den Client
  res.json(todos);
});

//     POST-Route zum Hinzufügen eines neuen Todos
server.post("/todos", (req, res) => {
  //     Lädt die bestehenden Todos aus der JSON-Datei
  const todos = loadTodos();

  //     Erstellt ein neues Todo-Objekt mit Daten aus dem Request-Body und
  //     einer automatischen ID
  const newTodo = {
    //     Wenn es bereits Todos gibt,
    //     wird die ID inkrementiert;
    //     andernfalls ID 1
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    //     Setzt den Titel des neuen Todos basierend auf dem "title"-Feld im Request-Body
    title: req.body.title,
    //     Setzt den Status "completed";
    //     Standard ist "false",
    //     falls nicht angegeben
    completed: req.body.completed || false,
    //     Setzt die userId;
    //     Standard ist "1",
    //     falls nicht angegeben
    userId: req.body.userId || 1,
  };

  //     Fügt das neue Todo zur Liste der Todos hinzu
  todos.push(newTodo);

  //     Speichert die aktualisierte Liste der Todos in der JSON-Datei
  saveTodos(todos);

  //     Sendet das neu erstellte Todo als JSON-Antwort zurück an den Client und
  //     setzt den Statuscode 201 (Created)
  res.status(201).json(newTodo);
});

//     Gibt eine Startmeldung in der Konsole aus
console.log("Starting server...");

//     Startet den Server und
//     lauscht auf dem definierten Port (4000)
server.listen(PORT, () => {
  //     Gibt eine Meldet in der Konsole,
  //     dass der Server erfolgreich gestartet wurde und
  //     auf Anfragen wartet
  console.log(`Server running on port ${PORT}`);
});
