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
  notes = req.body;
  req.body.id = req.body.title.val().toLowerCase();
  newNotes = JSON.stringify(notes);
  fs.writeFile(newNotes, "./db/db.json");
  res.json(notes);
});

app.delete("/api/notes/:id", function (req, res) {
  let deleteNote = req.params.id;
  for (i = 0; i < req.body.length; i++) {
    if (deleteNote === req.body[i].id) {
      res.json(deleteNote);
    }
  }
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
