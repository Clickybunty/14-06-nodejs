//     Funktion zum Abrufen der Todos vom Server
function getTodos() {
  //     Sendet eine HTTP-GET-Anfrage an den Server,
  //     um die Todo-Liste abzurufen

  //     Ändere die URL hier,
  //     falls der Server auf einer anderen Adresse läuft
  fetch("http://127.0.0.1:4000/todos")
    //     Wandelt die Antwort in JSON-Format um,
    //     um die Daten einfacher zu verarbeiten
    .then((response) => response.json())
    .then((json) => loadTodos(json));
  //     Übergibt die JSON-Daten an die Funktion loadTodos,
  //     um sie weiterzuverarbeiten
}

//     Funktion zum Laden der Todos in das HTML-Dokument
function loadTodos(todos) {
  //     Gibt die Todo-Liste zur Überprüfung in der Konsole aus
  console.log(todos);

  //     Schleife zum Durchlaufen jedes einzelnen Todos
  for (let i = 0; i < todos.length; i++) {
    //     Übergibt jedes Todo einzeln an die Funktion taskToHtml,
    //     um es in HTML-Elemente umzuwandeln
    taskToHtml(todos[i]);
  }
}

//     Funktion zum Erstellen der HTML-Elemente für ein einzelnes Todo
function taskToHtml(todo) {
  //     Gibt das einzelne Todo zur Überprüfung in der Konsole aus
  console.log(todo);

  //     Speichert den Status des Todos
  //     (ob erledigt oder nicht)
  let taskCompleted = todo.completed;

  //     Erzeugt ein neues Listen-Element (li) für das Todo
  let listItem = document.createElement("li");

  //     Setzt die ID des Todos als ID des Listen-Elements
  listItem.id = todo.id;

  //     Fügt ein benutzerdefiniertes Attribut userId hinzu, das die userId des Todos speichert
  listItem.setAttribute("userId", todo.userId);

  // Erzeugt eine Checkbox, die den Erledigungsstatus des Todos anzeigt
  let checkbox = document.createElement("input");

  //     Setzt den Typ des Elements auf Checkbox
  checkbox.type = "checkbox";

  //     Setzt den Status der Checkbox basierend auf den Status des Todos
  if (taskCompleted === true) {
    //     Markiert die Checkbox,
    //     wenn das Todo als erledigt gekennzeichnet ist
    checkbox.checked = true;
  } else {
    //     Lässt die Checkbox ungecheckt,
    //     wenn das Todo nicht erledigt ist
    checkbox.checked = false;
  }

  //     Erzeugt ein Span-Element,
  //     das den Titel des Todos enthält
  let taskText = document.createElement("span");
  //     Fügt den Titel des Todos als Textinhalt des Span-Elements hinzu
  taskText.textContent = todo.title + " ";

  //     Erzeugt einen Button zum Löschen des Todos
  let delButton = document.createElement("button");

  //     Setzt den Text des Buttons auf "Delete Task"
  delButton.textContent = "Delete Task";

  //     Fügt die Checkbox,
  //     den Text und den Button als Kinder zum Listen-Element hinzu
  listItem.appendChild(checkbox);
  listItem.appendChild(taskText);
  listItem.appendChild(delButton);

  //     Fügt das Listen-Element zur HTML-Liste mit der ID "task-list" hinzu
  document.getElementById("task-list").appendChild(listItem);
}

//     Funktion zum Hinzufügen eines neuen Todos
function addTask() {
  //     Holt den Text des neuen Todos aus dem Eingabefeld
  let taskContent = document.getElementById("userInput").value;

  //     Löscht den Inhalt des Eingabefeldes nach dem Abrufen
  document.getElementById("userInput").value = "";

  //     Konfiguration für die POST-Anfrage zum Hinzufügen eines neuen Todos
  const fetchConfig = {
    //     Methode ist POST,
    //     da ein neues Todo hinzugefügt werden soll
    method: "POST",
    headers: {
      //     Der Inhaltstyp wird auf JSON gesetzt
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //     Der Titel des neuen Todos
      title: taskContent,

      //     Setzt das neue Todo als nicht erledigt
      completed: false,
    }),
  };

  //     Sendet eine HTTP-POST-Anfrage an den Server,
  //     um das neue Todo hinzuzufügen
  fetch("http://127.0.0.1:4000/todos", fetchConfig)
    //     Wandelt die Antwort in JSON-Format um
    .then((response) => response.json())
    .then((newTodo) => {
      //     Das neue Todo wird zur Liste hinzugefügt und
      //     als HTML-Element dargestellt
      taskToHtml(newTodo);
    });
}

//     Erzeugt einen Event-Listener,
//     um zu verder die addTask-Funktion ausführt,
//     wenn auf den Button mit der ID "add-task" geklickt wird
document.getElementById("add-task").addEventListener("click", addTask);

//     Hauptfunktion: Lädt die Todos beim Start der Seite
getTodos();
