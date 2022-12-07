import { cleanInput } from "./input";

const marker = (size: number) =>
  cleanInput(`${__dirname}/input.txt`).reduce<string[]>(
    (acc, curr, index, arr) => {
      if (index > 3 && new Set(acc.slice(index - size, index)).size === size)
        arr.splice(1); // fail early
      return acc.push(curr), acc;
    },
    []
  ).length - 1;

export const part1 = () => marker(4);

export const part2 = () => marker(14);
