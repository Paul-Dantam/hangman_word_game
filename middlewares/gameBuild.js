const express = require("express");
const gameBuild = express.Router();

module.exports = gameBuild.use(function(req, res, next) {
  var game = req.session.game;
  if (!game) {
    game = req.session.game = {};
    game.mode = "";
    game.guessesLeft = 8;
    game.lettersGuessed = [];
    game.btnText = "Play game";
    game.status = "";
    game.lose = false;
    game.playing = false;
    game.message = "";
    game.display = "";
  }
  next();
});
