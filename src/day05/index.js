const { chunk, ints } = require("../utils/string");
const { cleanInput } = require("./input");

const stacksFrom = (drawing) => {
  /** @type {string[][]} */
  const stacks = [];
  drawing
    .split("\n")
    .reverse()
    .map((line) => chunk(line, 4).map((s) => s[1]))
    .slice(1)
    .forEach((pile) => {
      pile.forEach((crate, pos) => {
        if (crate !== " ")
          stacks[pos + 1] = [...(stacks[pos + 1] || []), crate];
      });
    });

  return stacks;
};

const topCrates = (stacks) =>
  stacks
    .filter(Boolean)
    .map((stack) => stack.pop())
    .join("");

const part1 = () => {
  const [drawing, procedure] = cleanInput(`${__dirname}/input.txt`);
  const stacks = stacksFrom(drawing);

  procedure.split("\n").forEach((move) => {
    const [count, from, to] = ints(move);
    let i;
    for (i = 0; i < count; i++) {
      if ((crate = stacks[from].pop())) stacks[to].push(crate);
    }
  });

  return topCrates(stacks);
};

const part2 = () => {
  const [drawing, procedure] = cleanInput(`${__dirname}/input.txt`);
  const stacks = stacksFrom(drawing);

  procedure.split("\n").forEach((move) => {
    const [count, from, to] = ints(move);
    stacks[to].push(...stacks[from].splice(stacks[from].length - count, count));
  });

  return topCrates(stacks);
};

module.exports = { part1, part2 };
