import { multiply, sum } from "@utils/array";
import { List, part1CleanInput, part2CleanInput } from "./input";

const compare = (left: List, right: List): number => {
  if (typeof left === "number" && typeof right === "number")
    return right - left;
  if (typeof left === "number" && Array.isArray(right))
    return compare([left], right);
  if (Array.isArray(left) && typeof right === "number")
    return compare(left, [right]);
  if (
    Array.isArray(left) &&
    left.length === 0 &&
    Array.isArray(right) &&
    right.length === 0
  )
    return 0;
  if (
    Array.isArray(left) &&
    left.length === 0 &&
    Array.isArray(right) &&
    right.length > 0
  )
    return 1;
  if (
    Array.isArray(left) &&
    left.length > 0 &&
    Array.isArray(right) &&
    right.length === 0
  )
    return -1;

  const [leftFirst, ...leftRest] = left as List[];
  const [rightFirst, ...rightRest] = right as List[];
  return compare(leftFirst, rightFirst) || compare(leftRest, rightRest);
};

export const part1 = () =>
  sum(
    part1CleanInput(`${__dirname}/input.txt`).reduce<number[]>(
      (indices, [left, right], index) => (
        compare(left, right) > 0 && indices.push(index + 1), indices
      ),
      []
    )
  );

export const part2 = () => {
  const dividers: List = [[[2]], [[6]]];
  const signal = part2CleanInput(`${__dirname}/input.txt`)
    .concat(dividers)
    .sort(compare)
    .reverse();

  return multiply(
    dividers.map(
      (divider) =>
        signal.findIndex(
          (packet) => JSON.stringify(packet) === JSON.stringify(divider)
        ) + 1
    )
  );
};
