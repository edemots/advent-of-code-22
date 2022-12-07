import { max, multiply } from "@utils/array";
import { sum } from "@utils/array";
import { cleanInput } from "./input";

const rays = (grid: number[][], i: number, j: number) =>
  [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ].reduce<number[][]>((rays, [v, h], index) => {
    let t: number;
    let [deltaI, deltaJ] = [i + v, j + h];
    rays[index] = [];
    while ((t = grid?.[deltaI]?.[deltaJ]) !== undefined) {
      rays[index].push(t);
      [deltaI, deltaJ] = [deltaI + v, deltaJ + h];
    }
    return rays;
  }, []);

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
