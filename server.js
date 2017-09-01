const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const logger = require("morgan");
const mustacheExpress = require("mustache-express");
const path = require("path");
const users = require("./data");

const checkAuth = require("./middlewares/checkAuth");
const userParser = require("./middlewares/userParser");
const sessionConfig = require("./sessionConfig");
const gameBuild = require("./middlewares/gameBuild");
const indexRoutes = require("./routes/indexRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();

const words = fs
  .readFileSync("/usr/share/dict/words", "utf-8")
  .toLowerCase()
  .split("\n");

const port = process.env.PORT || 8000;

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));
app.use(userParser);
app.use(gameBuild);

//routes
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/user", checkAuth, userRoutes);

app.listen(port, () => {
  console.log(`Word game server running on port ${port}.`);
});
