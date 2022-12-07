const { sumIf, sum, prefix, min } = require("../utils/array");
const { cleanInput } = require("./input");

const NEEDED_SPACE = 70000000 - 30000000;

const sizes = () => {
  let dirs = [];
  const sizes = {};
  for (const line of cleanInput(`${__dirname}/input.txt`)) {
    if (line === "$ cd /") dirs = [];
    if (line === "$ cd ..") dirs.pop();
    if ((matches = /\$ cd ((?!\.\.).+)/g.exec(line))) dirs.push(matches[1]);
    if ((matches = /(\d+) .+/g.exec(line)))
      for (const dir of prefix(dirs))
        sizes[dir] = (sizes[dir] || 0) + parseInt(matches[1]);
  }
  return Object.values(sizes);
};

const part1 = () => sumIf(sizes(), (value) => value <= 100000);

const part2 = () => {
  const fileSizes = sizes();
  return min(fileSizes.filter((size) => size >= fileSizes[0] - NEEDED_SPACE));
};

module.exports = { part1, part2 };
