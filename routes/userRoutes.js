var express = require("express");
var userRoutes = express.Router();
const vars = require("../variables/globalVar");
const wordFuncs = require("../functions/wordFunctions");

userRoutes.post("/easy", function(req, res) {
  vars.selectedWord = "";
  vars.answerArray = [];
  vars.guessArray = [];
  vars.guessCountDown = 10;
  vars.selectedWord = wordFuncs.randomEasyWord();
  return res.redirect("../game");
});

userRoutes.post("/normal", function(req, res) {
  vars.selectedWord = "";
  vars.answerArray = [];
  vars.guessArray = [];
  vars.guessCountDown = 8;
  vars.selectedWord = wordFuncs.randomNormalWord();
  return res.redirect("../game");
});

userRoutes.post("/hard", function(req, res) {
  vars.selectedWord = "";
  vars.answerArray = [];
  vars.guessArray = [];
  vars.guessCountDown = 5;
  vars.selectedWord = wordFuncs.randomHardWord();
  res.redirect("../game");
});

module.exports = userRoutes;
