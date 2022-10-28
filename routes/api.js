const express = require("express");

//The express.Router() function is used to create a new router object.
const api = express.Router();
//requiring node.js utility module bc  The Util module provides access to some utility functions.
const util = require("util");
// const path = require("path");
const fs = require("fs");
// const notesDatabase = require("../../db/db.json");

// Middleware for parsing JSON and urlencoded  data
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

//uuidv4 is a dependency that generates and universally unique id, which i use to give each note a unique id. here i'm requiring it
const { v4: uuidv4 } = require("uuid");

//here im telling it to require the  readFromFile, readAndAppend and  writeToFile function from the feUtil file.
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

//get notes by specific id. readfromfile returns a promisified data so we have to use .then and then use json parse to parse the data from a string to a js object, bc data is always received as string from web server. then we take the json data using .then and use filter to reate a new array of notes if that note id matches the requested id and returning the results if more than 0
api.get("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === noteId);
      return result.length > 0;
      // ? res.json(result)
      // : res.json("No note with that ID");
    });
});

//get request for getting ALL notes
api.get("/notes", (req, res) => {
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      res.json(json);
    });
});

//post request for all notes that posts newly entered notees into the db.json file and allows them to be displayed on the saved notes section (data persistence)
api.post("/notes", (req, res) => {
  console.info(`${req.method} request received for note`);

  //properties that the body should have in order to be saved (text and title)
  const { title, text } = req.body;

  //if the body of the request is there (text and title filled in), then the new note should have 3 properties, adding the id property
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    //adding newnote to db.json
    readAndAppend(newNote, "./db/db.json");
    res.json(`note added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

//to delete a specific note
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

module.exports = api;
