const { cleanInput } = require("./input");

const marker = (size) =>
  cleanInput(`${__dirname}/input.txt`).reduce((acc, curr, index, arr) => {
    if (index > 3 && new Set(acc.slice(index - size, index)).size === size)
      arr.splice(1); // fail early
    return acc.push(curr), acc;
  }, []).length - 1;

const part1 = () => marker(4);

const part2 = () => marker(14);

module.exports = { part1, part2 };
