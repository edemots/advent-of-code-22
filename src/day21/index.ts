import { intdiv } from "@utils/number";
import { cleanInput } from "./input";

const yell = (input: Record<string, string>, m: string): string => {
  if (/[a-z]+/g.test(input[m])) {
    return eval(
      input[m].replace(/[a-z]+/g, (m) => {
        return yell(input, m);
      })
    );
  }
  return input[m];
};

export const part1 = () =>
  parseInt(yell(cleanInput(`${__dirname}/input.txt`), "root"));

export const part2 = () => {
  const input = cleanInput(`${__dirname}/example-input.txt`);

  input.root = input.root.replace(/[\+\/\*]/, "-");
  let min = 0;
  let max = Number.MAX_SAFE_INTEGER;
  let mid = intdiv(min + max, 2);
  let res;

  input.humn = mid;
  res = parseInt(yell(input, "root"));
  // to handle the case where l < r in root: l - r
  const inv = Math.sign(res);

  if (res === 0) return mid;

  while (max - min > 1) {
    mid = intdiv(min + max, 2);
    input.humn = mid;
    res = parseInt(yell(input, "root")) * inv;

    if (res === 0) break;
    else if (res < 0) min = mid;
    else max = mid;
  }

  return mid;
};
