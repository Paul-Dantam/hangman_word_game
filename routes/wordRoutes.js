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

wordRoutes.get("/newgame", (req, res) => {
  const randomWord = words[getRandomInt(0, words.length - 1)];
  console.log("randomWord: ", randomWord);
  req.session.word = randomWord;
  res.redirect("/");

  let displayArray = [];
  for (let i = 0; i < randomWord.length; i++) {
    displayArray.push("_");
  }
  req.session.display = displayArray;
  req.session.wrongGuesses = [];
  req.session.correctGuesses = [];
  req.session.turns = 8;
  res.redirect("/");
});

wordRoutes.post("/", (req, res) => {
  let guessLetter = req.body.letter.toUpperCase();
  let word = req.session.word;

  if (
    req.session.wrongGuesses.indexOf(guessLetter) > -1 ||
    req.session.correctGuesses(indexOf)
  ) {
    req.session.msg = "you already guessed that letter.";
    return res.redirect("/");
  }

  if (word.indexOf(guessLetter) < 0) {
    req.session.msg = "Wrong";
    req.session.wrongGuesses.push(guessLetter);
    req.session.turns -= 1;
    if (req.session.turns < 1) {
      req.session.msg = "no more turns. Game Over";
      return res.redirect("/");
    }
  }

  for (let i = 0; i < word.length; i++) {
    if (word.charAt(i) === guessLetter) {
      req.session.msg = null;
      display[i] = guessLetter;
    }
  }
});

module.exports = wordRoutes;
