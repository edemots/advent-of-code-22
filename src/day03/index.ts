import { sum, chunk, intersect } from "@utils/array";
import { intdiv } from "@utils/number";
import { ord } from "@utils/string";
import { cleanInput } from "./input";

const priority = (c: string) => {
  if (c >= "a" && c <= "z") return ord(c) - ord("a") + 1;
  if (c >= "A" && c <= "Z") return ord(c) - ord("A") + 27;
};

export const part1 = () =>
  sum(
    cleanInput(`${__dirname}/input.txt`).map((l) => {
      const middle = intdiv(l.length, 2);
      const [c] = [
        ...intersect(
          l.substring(0, middle).split(""),
          l.substring(middle).split("")
        ),
      ];
      return Number(priority(c));
    })
  );

export const part2 = () =>
  sum(
    chunk(cleanInput(`${__dirname}/input.txt`), 3).map((chunk) => {
      const [c] = [...intersect(...chunk.map((l) => l.split("")))];
      return Number(priority(c));
    })
  );
