const words = fs
  .readFileSync("/usr/share/dict/words", "utf-8")
  .toLowerCase()
  .split("\n");

function easy() {
  var index = 1000;
  while (words[index].length < 0 || words[index].length > 6) {
    var index = Math.floor(Math.random() * 235887);
  }
  return words[index];
}

function normal() {
  var index = 0;
  while (words[index].length > 8 || words[index].length < 6) {
    var index = Math.floor(Math.random() * 235887);
  }
  return words[index];
}

function normal() {
  var index = 0;
  while (words[index].length < 8) {
    var index = Math.floor(Math.random() * 11);
  }
  return words[index];
}

module.exports = {
  easy: easy,
  normal: normal,
  hard: hard
};
