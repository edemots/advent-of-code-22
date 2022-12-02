const { readlines } = require("../utils/file");

const opponent = ["A", "B", "C"];
const me = ["X", "Y", "Z"];

const cleanInput = (inputPath) =>
  readlines(inputPath).map((round) => {
    round = round.split(" ");
    return [opponent.indexOf(round[0]) + 1, me.indexOf(round[1]) + 1];
  });

module.exports = { cleanInput };
