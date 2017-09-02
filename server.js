const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const logger = require("morgan");
const mustacheExpress = require("mustache-express");
const path = require("path");
const fs = require("fs");
const wordRoutes = require("./routes/wordRoutes");
const words = fs
  .readFileSync("/usr/share/dict/words", "utf-8")
  .toUpperCase()
  .split("\n");

const sessionConfig = require("./sessionConfig");
const indexRoutes = require("./routes/indexRoutes");
const app = express();

const port = process.env.PORT || 8000;

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static(path.join(__dirname, "public")));
// app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));

//routes
app.use("/", indexRoutes);
app.use("/word", wordRoutes);

app.listen(port, () => {
  console.log(`Word game server running on port ${port}.`);
});
