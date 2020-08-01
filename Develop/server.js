const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

let notes = []; //array to store object of notes

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  notes = fs.readFileSync("./db/db.json");
  res.json(JSON.parse(notes));
});

app.post("/api/notes", function (req, res) {
  notes = fs.readFileSync("./db/db.json");
  notes = JSON.parse(notes);
  let newNotes = req.body;
  newNotes["id"] = newNotes.title;
  notes.push(newNotes);
  notes = JSON.stringify(notes);
  fs.writeFile("./db/db.json", notes, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Notes updated!");
  });
  res.json(notes);
});

app.delete("/api/notes/:id", function (req, res) {
  let deleteNote = req.params.id;
  console.log(deleteNote);
  notes = fs.readFileSync("./db/db.json");
  notes = JSON.parse(notes);
  let filtered = notes.filter((notes) => notes.id != deleteNote);
  console.log(filtered);
  let newNote = JSON.stringify(filtered);
  fs.writeFile("./db/db.json", newNote, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Deleted Note!");
  });

  return res.json(filtered);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
