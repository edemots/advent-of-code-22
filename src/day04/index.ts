import { sum } from "@utils/array";
import { cleanInput } from "./input";

export const part1 = () =>
  sum(
    cleanInput(`${__dirname}/input.txt`).map(
      ([startLeft, endLeft, startRight, endRight]) =>
        Number(
          (startLeft <= startRight && endLeft >= endRight) ||
            (startRight <= startLeft && endRight >= endLeft)
        )
    )
  );

export const part2 = () =>
  sum(
    cleanInput(`${__dirname}/input.txt`).map(
      ([startLeft, endLeft, startRight, endRight]) =>
        Number(!(endLeft < startRight) && !(endRight < startLeft))
    )
  );
