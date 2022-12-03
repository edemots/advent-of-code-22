const { sum, chunk, intersect } = require("../utils/array");
const { priority } = require("./common");
const { cleanInput } = require("./input");

function solve() {
  return sum(
    chunk(cleanInput(`${__dirname}/input.txt`), 3).map((chunk) => {
      const [c] = [...intersect(...chunk.map((l) => l.split("")))];
      return priority(c);
    })
  );
}

module.exports = { solve };
