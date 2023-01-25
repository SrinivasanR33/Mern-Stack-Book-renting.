const express = require("express");
const core = require("cors");
const app = express();
const bodyParser = require("body-parser");
const apiPort = 5000;
const db = require("./db.config");
const { task } = require("./control/user-modal");
const bookRouter = require("./route/bookroute");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(core());
app.use(bodyParser.json());

db.on("err", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/api", bookRouter);
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
