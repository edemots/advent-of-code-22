import { range } from "@utils/array";
import { ord } from "@utils/string";
import { V, Vector } from "@utils/vector";
import { cleanInput } from "./input";

const boundaries = (input: string) => {
  const grid = cleanInput(input);

  let start = V(0, 0);
  let end = V(0, 0);
  for (const i of range(0, grid.length - 1)) {
    for (const j of range(0, grid[i].length - 1)) {
      if (grid[i][j] === "S") start = V(i, j);
      if (grid[i][j] === "E") end = V(i, j);
    }
  }

  return { grid, start, end };
};

const height = (c: string) => {
  if (c === "S") return ord("a");
  if (c === "E") return ord("z");
  return ord(c);
};

const adjacencies = (curr: Vector) =>
  [V(0, -1), V(0, 1), V(-1, 0), V(1, 0)].map((delta) => curr.add(delta));

const moves = (grid: string[][], curr: Vector) =>
  adjacencies(curr).filter(
    (move) =>
      move &&
      grid?.[move.x]?.[move.y] &&
      height(grid[move.x][move.y]) - height(grid[curr.x][curr.y]) >= -1
  );

const distanceTo = (
  target: Vector,
  grid: string[][],
  targetFn: (move: Vector) => boolean
) => {
  const seen = [target];
  let currentPath = [target];
  let nextPath: Vector[] = [];
  let distance = 0;
  while (currentPath.length > 0) {
    for (const path of currentPath) {
      for (const move of moves(grid, path)) {
        if (!seen.find((m) => m.eq(move))) {
          if (targetFn(move)) {
            return distance + 1;
          }
          seen.push(move);
          nextPath.push(move);
        }
      }
    }
    currentPath = nextPath;
    nextPath = [];
    distance++;
  }
};

export const part1 = () => {
  const { grid, start, end } = boundaries(`${__dirname}/input.txt`);
  return distanceTo(end, grid, (move) => move.eq(start));
};

export const part2 = () => {
  const { grid, end } = boundaries(`${__dirname}/input.txt`);
  return distanceTo(
    end,
    grid,
    (move) => height(grid[move.x][move.y]) === height("a")
  );
};
