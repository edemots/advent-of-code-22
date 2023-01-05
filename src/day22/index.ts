import { mod } from "@utils/number";
import { V, Vector } from "@utils/vector";
import { cleanInput } from "./input";

enum Tile {
  Void = " ",
  Wall = "#",
  Opened = ".",
}

const DIRS = [V(1, 0), V(0, 1), V(-1, 0), V(0, -1)];

let board: string[] = [];
let width = 0;
let height = 0;
let curr = V(0, 0);
let facing = 0;

const lookup = (x: number, y: number) =>
  0 <= x && x < width && 0 <= y && y < height
    ? (board[y][x] as Tile)
    : Tile.Void;

const peek = (): [Vector, Tile] => {
  const nxt = curr.add(DIRS[facing]);
  return [nxt, lookup(nxt.x, nxt.y)];
};

const warp = () => {
  const { x, y } = DIRS[facing];
  let nxt = V(mod(curr.x + x, width), mod(curr.y + y, height));
  while (lookup(nxt.x, nxt.y) === Tile.Void)
    nxt = V(mod(nxt.x + x, width), mod(nxt.y + y, height));
  return nxt;
};

const turn = (rot: string) => {
  if (rot === "R") return mod(facing + 1, DIRS.length); // clockwise
  return mod(facing - 1, DIRS.length); // counterclockwise
};

const forward = () => {
  let [nxt, val] = peek();
  if (val === Tile.Void) {
    nxt = warp();
    val = lookup(nxt.x, nxt.y);
  }
  if (val !== Tile.Wall) {
    curr = nxt;
    return true;
  }
  return false;
};

export const part1 = () => {
  const [b, acts] = cleanInput(`${__dirname}/input.txt`);
  board = b;
  width = b[0].length;
  height = b.length;
  curr = V(width - b[0].trimStart().length, 0);

  for (let act of acts) {
    if (/L|R/.test(act.charAt(0))) {
      facing = turn(act.charAt(0));
      act = act.slice(1);
    }
    for (let s = 0; s < parseInt(act); s++) {
      if (!forward()) break;
    }
  }

  return 1000 * (curr.y + 1) + 4 * (curr.x + 1) + facing;
};

export const part2 = () => cleanInput(`${__dirname}/example-input.txt`);
