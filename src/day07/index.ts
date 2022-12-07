import { sumIf, prefix, min } from "@utils/array";
import { cleanInput } from "./input";

const NEEDED_SPACE = 70000000 - 30000000;

const sizes = () => {
  let dirs = [];
  const sizes: Record<string, number> = {};
  for (const line of cleanInput(`${__dirname}/input.txt`)) {
    if (line === "$ cd /") dirs = [];
    if (line === "$ cd ..") dirs.pop();
    let matches: RegExpExecArray | null;
    if ((matches = /\$ cd ((?!\.\.).+)/g.exec(line))) dirs.push(matches[1]);
    if ((matches = /(\d+) .+/g.exec(line)))
      for (const dir of prefix(dirs))
        sizes[dir] = (sizes[dir] || 0) + parseInt(matches[1]);
  }
  return Object.values(sizes);
};

export const part1 = () => sumIf(sizes(), (value) => value <= 100000);

export const part2 = () => {
  const fileSizes = sizes();
  return min(fileSizes.filter((size) => size >= fileSizes[0] - NEEDED_SPACE));
};
