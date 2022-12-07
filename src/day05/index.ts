import { chunk, ints } from "@utils/string";
import { cleanInput } from "./input";

const stacksFrom = (drawing: string) => {
  const stacks: string[][] = [];
  drawing
    .split("\n")
    .reverse()
    .map((line) => chunk(line, 4)?.map((s) => s[1]))
    .slice(1)
    .forEach((pile) => {
      pile?.forEach((crate, pos) => {
        if (crate !== " ")
          stacks[pos + 1] = [...(stacks[pos + 1] || []), crate];
      });
    });

  return stacks;
};

const topCrates = (stacks: string[][]) =>
  stacks
    .filter(Boolean)
    .map((stack) => stack.pop())
    .join("");

export const part1 = () => {
  const [drawing, procedure] = cleanInput(`${__dirname}/input.txt`);
  const stacks = stacksFrom(drawing);

  procedure.split("\n").forEach((move) => {
    const [count, from, to] = ints(move);
    let crate: string | undefined;
    for (let i = 0; i < count; i++)
      if ((crate = stacks[from].pop())) stacks[to].push(crate);
  });

  return topCrates(stacks);
};

export const part2 = () => {
  const [drawing, procedure] = cleanInput(`${__dirname}/input.txt`);
  const stacks = stacksFrom(drawing);

  procedure.split("\n").forEach((move) => {
    const [count, from, to] = ints(move);
    stacks[to].push(...stacks[from].splice(stacks[from].length - count, count));
  });

  return topCrates(stacks);
};
