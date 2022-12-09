import { max, multiply } from "@utils/array";
import { sum } from "@utils/array";
import { V } from "@utils/vector";
import { cleanInput } from "./input";

const rays = (grid: number[][], i: number, j: number) =>
  [V(0, -1), V(0, 1), V(-1, 0), V(1, 0)].reduce<number[][]>(
    (rays, delta, index) => {
      let t: number;
      let vector = V(i, j).add(delta);
      rays[index] = [];
      while ((t = grid?.[vector.x]?.[vector.y]) !== undefined) {
        rays[index].push(t);
        vector.add(delta);
      }
      return rays;
    },
    []
  );

export const part1 = () =>
  sum(
    cleanInput(`${__dirname}/input.txt`).map(
      (row, rowIndex, trees) =>
        row
          .map((tree, colIndex) =>
            rays(trees, rowIndex, colIndex).some((ray) =>
              ray.every((t) => t < tree)
            )
          )
          .filter(Boolean).length
    )
  );

export const part2 = () =>
  max(
    cleanInput(`${__dirname}/input.txt`).map((row, rowIndex, trees) =>
      max(
        row.map((tree, colIndex) =>
          multiply(
            rays(trees, rowIndex, colIndex).map((ray) =>
              ray?.reduce((seen, t, _i, arr) => {
                if (t >= tree) arr.splice(1);
                return (seen += 1);
              }, 0)
            )
          )
        )
      )
    )
  );
