const { sum } = require("../utils/array");
const { priority } = require("./common");
const { cleanInput } = require("./input");

function solve() {
  return sum(
    cleanInput(`${__dirname}/input.txt`).map((l) => {
      const middle = intdiv(l.length, 2);
      const [c] = [
        ...intersect(
          l.substring(0, middle).split(""),
          l.substring(middle).split("")
        ),
      ];
      return priority(c);
    })
  );
}

module.exports = { solve };
