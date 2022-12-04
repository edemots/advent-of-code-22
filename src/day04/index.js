const { sum } = require("../utils/array");
const { cleanInput } = require("./input");

const part1 = () =>
  sum(
    cleanInput(`${__dirname}/input.txt`).map(
      ([startLeft, endLeft, startRight, endRight]) =>
        (startLeft <= startRight && endLeft >= endRight) ||
        (startRight <= startLeft && endRight >= endLeft)
    )
  );

const part2 = () =>
  sum(
    cleanInput(`${__dirname}/input.txt`).map(
      ([startLeft, endLeft, startRight, endRight]) =>
        !(endLeft < startRight) && !(endRight < startLeft)
    )
  );

module.exports = { part1, part2 };
