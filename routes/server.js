const fs = require("fs");
const express = require("express");
const miniApp = require("express").Router();
const path = require("path");

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//importing module routers
const htmlRouter = require("../routes/html");
const apiRouter = require("../routes/api");

//making new instance of express
const app = express();
const PORT = 3000;

//requiring mini app to use the modular routers
miniApp.use("../routes/api", apiRouter);
miniApp.use("../routes/html", htmlRouter);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

module.exports = miniApp;
