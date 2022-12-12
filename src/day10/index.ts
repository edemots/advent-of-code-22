import { chunk, range, sum } from "@utils/array";
import { cleanInput } from "./input";

const signals = (input: string) =>
  [
    1,
    ...cleanInput(input).flatMap((instr, x) => {
      if (instr === "noop") return [0];
      return [0, parseInt(/addx (-?\d+)/.exec(instr)?.[1] || "0")];
    }),
  ].map((_, i, arr) => (arr[i] += arr[i - 1] || 0));

export const part1 = () =>
  sum(
    range(20, 220, 40).map((c) => c * signals(`${__dirname}/input.txt`)[c - 1])
  );

export const part2 = () => {
  chunk(signals(`${__dirname}/input.txt`), 40)
    .map((g) => g.map((s, k) => Math.abs(s - k) <= 1))
    .map((g) => g.map((s) => (s ? "#" : ".")))
    .map((g) => g.join(""))
    .forEach((l) => console.log(l));

  return "Read the letters from the output.";
};
