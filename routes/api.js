const express = require("express");
const api = express.Router();
const path = require("path");
const fs = require("fs");
// const notesDatabase = require("../../db/db.json");
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
const util = require("util");

const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

//get notes by id
api.get("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  console.log(req.params);
  console.log(selectedId);
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === noteId);
      return result.length > 0;
      // ? res.json(result)
      // : res.json("No note with that ID");
    });
});

api.get("/notes", (req, res) => {
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      res.json(json);
    });
});

//post/save notes
api.post("/notes", (req, res) => {
  console.info(`${req.method} request received for note`);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`note added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

//to delete notes
api.delete("/notes/:id", (req, res) => {
  const selectedId = req.params.id;
  console.log(req.params);
  console.log(selectedId);
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((note) => note.id !== selectedId);

      // Save that array to the filesystem
      writeToFile("./db/db.json", result);

      // Respond to the DELETE request
      res.json(result);
    });
});
// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

module.exports = api;
