const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  let db = fs.readFileSync("./db/db.json");
  res.json(JSON.parse(db));
});

app.post("/api/notes", function (req, res) {
  let data = req.body;
  let newNotes = JSON.stringify(data);
  fs.writeFile(newNotes, "./db/db.json");
  res.json(data);
});

app.delete("/api/notes/:id", function (req, res) {
  const deleteNote = req.param.id;
  for (i = 0; i < req.body.length; i++) {
    if (deleteNote === req.body[i].id) {
      return res.json(req.body[i]);
    }
  }
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
