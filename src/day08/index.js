const { max, multiply } = require("../utils/array");
const { sum } = require("../utils/array");
const { cleanInput } = require("./input");

const rays = (grid, i, j) =>
  [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ].reduce((rays, [v, h], index) => {
    let [deltaI, deltaJ] = [i + v, j + h];
    rays[index] = [];
    while ((t = grid?.[deltaI]?.[deltaJ]) !== undefined) {
      rays[index].push(t);
      [deltaI, deltaJ] = [deltaI + v, deltaJ + h];
    }
    return rays;
  }, []);

const part1 = () =>
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

const part2 = () =>
  max(
    cleanInput(`${__dirname}/input.txt`).map((row, rowIndex, trees) =>
      max(
        row.map((tree, colIndex) =>
          multiply(
            rays(trees, rowIndex, colIndex).map((ray) =>
              ray?.reduce((seen, t) => {
                if (t >= tree) arr.splice(1);
                return (seen += 1);
              }, 0)
            )
          )
        )
      )
    )
  );

module.exports = { part1, part2 };
