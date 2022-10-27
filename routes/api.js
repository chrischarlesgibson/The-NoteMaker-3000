const fs = require("fs");
const express = require("express");
//path so that when doing html routes the / or \ doesnt matter
const path = require("path");

//declaring a port to use
const PORT = 3000;

//making a new instance of express and setting it equal to app
const app = express();

// get request for index html
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

//get for notes api
app.get("/api/notes", (req, res) => {
  res.json({
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000,
  });
});
// post for notes
// app.post("/api/notes", (req, res) => {

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
