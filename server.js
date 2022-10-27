const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//importing module routers
const htmlRouter = require("./routes/html");
const apiRouter = require("./routes/api");
//requiring mini app to use the modular routers
app.use("/api", apiRouter);
app.use("/", htmlRouter);
//making new instance of express

app.listen(process.env.port || 3000);
console.log(`Example app listening at http://localhost:${PORT}`);

module.exports = app;
