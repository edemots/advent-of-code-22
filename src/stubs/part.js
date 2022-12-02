const { cleanInput } = require("./input");

function solve() {
  return cleanInput(`${__dirname}/input.txt`);
}

module.exports = { solve };
