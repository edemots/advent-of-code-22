import { intersect } from "@utils/array";
import { mod } from "@utils/number";
import { V, Vector } from "@utils/vector";
import { Blizzard, cleanInput, DIRS } from "./input";

const preview = (bs: Blizzard[], fx: number, fy: number) => {
  const dt = Date.now();
  while (Date.now() - dt <= 100) {}

  let p = "";
  for (let y = 0; y < fy + 2; y++) {
    for (let x = 0; x < fx + 2; x++) {
      //   if (me.y === y - 1 && me.x === x - 1) p += "E";
      if (
        (y === 0 && x !== 1) ||
        (y === fy + 1 && x !== fx) ||
        x === 0 ||
        x === fx + 1
      )
        p += "#";
      else {
        let conflicting = bs.filter((b) => b.x === x - 1 && b.y === y - 1);
        if (conflicting.length === 1) {
          p +=
            Object.keys(DIRS)[
              Object.values(DIRS).findIndex((d) =>
                d.eq(conflicting[0].direction)
              )
            ];
        } else if (conflicting.length > 1) p += conflicting.length;
        else p += ".";
      }
    }
    p += "\n";
  }
  //   console.clear();
  console.log(p);
};

const moveBlizzard = (b: Blizzard, fx: number, fy: number) =>
  ({
    ...b,
    x: mod(b.x + b.direction.x, fx),
    y: mod(b.y + b.direction.y, fy),
  } as Blizzard);

const moveBlizzards = (blizzards: Blizzard[], fx: number, fy: number) =>
  blizzards.map((b) => moveBlizzard(b, fx, fy));

const canMove = (to: Vector, bs: Blizzard[], fx: number, fy: number) =>
  0 <= to.x && to.x < fx && 0 <= to.y && to.y < fy;

const move = (
  possibilities: Vector[],
  bs: Blizzard[],
  fx: number,
  fy: number
) => {
  const result: Vector[] = [];
  for (const possibility of possibilities) {
    const dirs = [
      V(possibility.x - 1, possibility.y),
      V(possibility.x + 1, possibility.y),
      V(possibility.x, possibility.y - 1),
      V(possibility.x, possibility.y + 1),
    ];
    for (let d = 0; d < dirs.length; d++) {
      const possibleDir = dirs[d];
      if (canMove(possibleDir, bs, fx, fy)) result.push(possibleDir);
    }
  }
  return result;
};

const solve = (
  {
    blizzards: originalBlizzards,
    fx,
    fy,
  }: {
    blizzards: Blizzard[];
    fx: number;
    fy: number;
  },
  p: number
) => {
  let possibilities = [V(0, -1)];
  let blizzards = originalBlizzards.slice(0);
  let visit = 0;

  let i = 0;
  while (visit < 3) {
    i++;
    blizzards = moveBlizzards(blizzards, fx, fy);
    possibilities = [
      ...new Set([
        ...possibilities.map((v) => JSON.stringify(v)),
        ...move(possibilities, blizzards, fx, fy).map((v) => JSON.stringify(v)),
      ]),
    ].map((v) => JSON.parse(v));
    possibilities = possibilities.filter(
      (p) => blizzards.findIndex((b) => b.x === p.x && b.y === p.y) < 0
    );

    if (
      (p === 1 || (p === 2 && visit % 2 === 0)) &&
      possibilities.findIndex((p) => p.x === fx - 1 && p.y === fy - 1) >= 0
    ) {
      if (p === 1 || (p === 2 && visit === 2)) return i + 1;
      visit++;
      possibilities = [V(fx - 1, fy)];
    }
    if (
      p === 2 &&
      visit === 1 &&
      possibilities.findIndex((p) => p.x === 0 && p.y === 0) >= 0
    ) {
      visit++;
      possibilities = [V(0, -1)];
    }
  }
};

export const part1 = () => solve(cleanInput(`${__dirname}/input.txt`), 1);

export const part2 = () => solve(cleanInput(`${__dirname}/input.txt`), 2);
