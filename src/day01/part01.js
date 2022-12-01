const { max, sum } = require("../utils/array");
const cleanInput = require("./input");

function solve() {
  const elfCalories = cleanInput(`${__dirname}/input.txt`).map((calories) =>
    sum(calories)
  );

  return max(elfCalories);
}

module.exports = { solve };
