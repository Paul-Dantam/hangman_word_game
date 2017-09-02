const express = require("express");
const wordRoutes = express.Router();
const fs = require("fs");

const words = fs
  .readFileSync("/usr/share/dict/words", "utf-8")
  .toUpperCase()
  .split("\n");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function lossResponse() {
  let response = window.confirm("Do you want to play again?");
  if (response === true) res.redirect("/words/newgame");
  else res.redirect("/");
}

wordRoutes.get("/newgame", (req, res) => {
  const randomWord = words[getRandomInt(0, words.length - 1)];
  console.log("randomWord: ", randomWord);
  req.session.word = randomWord;
  let displayArray = [];
  for (let i = 0; i < randomWord.length; i++) {
    displayArray.push("_ ");
  }
  req.session.display = displayArray;
  req.session.wrongGuesses = [];
  req.session.correctGuesses = [];
  req.session.turns = 8;
  req.session.msg = "Good Luck, you can miss " + req.session.turns + " guesses";
  res.redirect("/");
});

wordRoutes.post("/guess", (req, res) => {
  let guessLetter = req.body.letter.toUpperCase();
  let word = req.session.word;
  console.log(req.session.wrongGuesses, req.session.correctGuesses);

  if (
    req.session.wrongGuesses.indexOf(guessLetter) > -1 ||
    req.session.correctGuesses.indexOf(guessLetter) > -1
  ) {
    req.session.msg =
      "you already guessed that letter, you have " +
      req.session.turns +
      " turns left.";
    return res.redirect("/");
  } else if (word.indexOf(guessLetter) < 0) {
    req.session.turns -= 1;
    if (req.session.turns < 1) {
      req.session.msg = "no more turns. Game Over";
    }
    req.session.msg = "Wrong, you have " + req.session.turns + " turns left";
    req.session.wrongGuesses.push(guessLetter);
    return res.redirect("/");
    if (req.session.turns < 1) {
      req.session.msg = "no more turns. Game Over";
      return res.redirect("/");
    }
  } else
    for (let i = 0; i < word.length; i++) {
      if (word.charAt(i).toUpperCase() === guessLetter) {
        req.session.msg =
          "Correct , you have " + req.session.turns + " turns left";
        req.session.display[i] = guessLetter;
        if (req.session.correctGuesses.indexOf(guessLetter) < 0) {
          req.session.correctGuesses.push(guessLetter);
        }
      }
    }
  return res.redirect("/");
});

module.exports = wordRoutes;
