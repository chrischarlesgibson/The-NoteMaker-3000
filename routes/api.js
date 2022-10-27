const express = require("express");
const api = express.Router();
const path = require("path");

// get request for index html
api.get("*", (req, res) =>
  res.sendFile(path.join(__dirname + "../public/index.html"))
);

//get for notes api
api.get("/api/notes", (req, res) => {
  res.json({
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000,
  });
});

module.exports = api;
