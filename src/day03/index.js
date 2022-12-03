const { sum, chunk, intersect } = require("../utils/array");
const { intdiv } = require("../utils/number");
const { ord } = require("../utils/string");
const { cleanInput } = require("./input");

const priority = (c) => {
  if (c >= "a" && c <= "z") return ord(c) - ord("a") + 1;
  if (c >= "A" && c <= "Z") return ord(c) - ord("A") + 27;
};

const part1 = () =>
  sum(
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

const part2 = () =>
  sum(
    chunk(cleanInput(`${__dirname}/input.txt`), 3).map((chunk) => {
      const [c] = [...intersect(...chunk.map((l) => l.split("")))];
      return priority(c);
    })
  );

module.exports = { part1, part2 };
