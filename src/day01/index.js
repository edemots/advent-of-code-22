const { max, sum } = require("../utils/array");
const { cleanInput } = require("./input");

const calories = cleanInput(`${__dirname}/input.txt`).map((calories) =>
  sum(calories)
);

const part1 = () => max(calories);

const part2 = () => sum(max(calories, 3));

module.exports = { part1, part2 };
