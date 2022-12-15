import os from "os";
import { max, min } from "@utils/array";
import { V, Vector } from "@utils/vector";
import { cleanInput } from "./input";

interface Boundaries {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

let example = false;
let grid: string[][] = [];
let bounds: Boundaries;
let count: number = 0;

const boundaries = (paths: Vector[]): Boundaries => ({
  minX: min(paths.map((v) => v.x)),
  maxX: max(paths.map((v) => v.x)),
  minY: 0,
  maxY: max(paths.map((row) => row.y)),
});

const draw = () => {
  const map: string[][] = [];

  for (let row = 0; row < bounds.maxY - bounds.minY + 1; row++) {
    map[row] = [];
    for (let col = 0; col < bounds.maxX - bounds.minX + 1; col++) {
      map[row][col] = ".";
      if (grid?.[row]?.[col]) map[row][col] = grid[row][col];
    }
  }

  process.stdout.cursorTo(0);

  for (let index = 0; index < 3; index++) {
    process.stdout.write(
      `${Array.from(
        {
          length: (map.length - 1).toString().length + 1,
        },
        (_) => " "
      ).join("")}${bounds.minX.toString()[index]}`
    );
    for (let x = bounds.minX; x < 499; x++) {
      process.stdout.write(" ");
    }
    process.stdout.write(`${"500"[index]}`);
    for (let x = 501; x < bounds.maxX; x++) {
      process.stdout.write(" ");
    }
    process.stdout.write(`${bounds.maxX.toString()[index]}${os.EOL}`);
  }
  process.stdout.write(
    `${map
      .map(
        (path, i) =>
          Array.from(
            {
              length: (map.length - 1).toString().length - i.toString().length,
            },
            (_) => " "
          ).join("") +
          `${i} ` +
          path.join("")
      )
      .join("\n")}`
  );

  sleep(50);
  clear();
};

const clear = () => {
  process.stdout.moveCursor(0, -(bounds.maxY + 3));
  process.stdout.clearLine(0);
  process.stdout.clearScreenDown();
};

const sleep = (time: number) => {
  const dt = Date.now();
  while (Date.now() - dt <= time) {}
};

const actualX = (v: Vector) => v.x - bounds.minX;
const actualY = (v: Vector) => v.y - bounds.minY;

const blocked = (sand: Vector): boolean => {
  const addObstacle = () => {
    if (!grid[actualY(sand)]) grid[actualY(sand)] = [];
    grid[actualY(sand)][actualX(sand)] = "o";
    count++;

    example && draw();
  };

  let atRest;
  return (
    Boolean(grid?.[actualY(sand)]?.[actualX(sand)]) ||
    (sand.y < bounds.maxY &&
      ((atRest =
        blocked(sand.add(V(0, 1))) &&
        blocked(sand.add(V(-1, 1))) &&
        blocked(sand.add(V(1, 1)))),
      atRest && addObstacle(),
      atRest))
  );
};

export const part1 = (ex = false) => {
  example = ex;
  grid = [];
  count = 0;

  const rocks = cleanInput(
    `${__dirname}/${example ? "example-" : ""}input.txt`
  );

  bounds = boundaries(rocks);
  for (const rock of rocks) {
    if (!grid[actualY(rock)]) grid[actualY(rock)] = [];
    grid[actualY(rock)][actualX(rock)] = "#";
  }

  let outbound = false;
  while (!outbound) {
    outbound = !blocked(V(500, 0));
  }

  example && process.stdout.write(os.EOL);

  return count;
};

export const part2 = (ex = false) => {
  example = ex;
  grid = [];
  count = 0;

  let rocks = cleanInput(`${__dirname}/${example ? "example-" : ""}input.txt`);
  bounds = boundaries(rocks);
  rocks = rocks.concat(
    example
      ? Array.from({ length: bounds.maxX - bounds.minX + 16 }, (_, i) =>
          V(bounds.minX + i - 6, bounds.maxY + 2)
        )
      : Array.from({ length: 1000 }, (_, i) => V(i, bounds.maxY + 2))
  );
  bounds = boundaries(rocks);

  for (const rock of rocks) {
    if (!grid[actualY(rock)]) grid[actualY(rock)] = [];
    grid[actualY(rock)][actualX(rock)] = "#";
  }

  let full = false;
  while (!full) {
    full = blocked(V(500, 0));
  }

  example && process.stdout.write(os.EOL);

  return count;
};
