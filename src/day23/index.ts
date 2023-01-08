import { V, Vector } from "@utils/vector";
import { cleanInput } from "./input";

const bounds = (e: Map<string, Vector>) => {
  let xMin = 0;
  let xMax = xMin;
  let yMin = 0;
  let yMax = yMin;

  for (const { x, y } of e.values()) {
    if (x < xMin) xMin = x;
    if (x > xMax) xMax = x;
    if (y < yMin) yMin = y;
    if (y > yMax) yMax = y;
  }

  return { xMin, xMax, yMin, yMax };
};

const preview = (e: Map<string, Vector>) => {
  const { xMin, xMax, yMin, yMax } = bounds(e);
  console.log(
    Array.from({ length: yMax - yMin + 1 }, (_, y) =>
      Array.from({ length: xMax - xMin + 1 }, (_, x) =>
        e.has(JSON.stringify(V(xMin + x, yMin + y))) ? "#" : "."
      ).join("")
    ).join("\n") + "\n\n"
  );
};

const result = ({
  xMin,
  xMax,
  yMin,
  yMax,
}: {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}) => {
  return (xMax - xMin + 1) * (yMax - yMin + 1);
};

const trymove = (elf: Vector, elves: Map<string, Vector>, r: number) => {
  const surrounds: Vector[] = [];
  [-1, 0, 1].forEach((dy) =>
    [-1, 0, 1].forEach(
      (dx) => (dx || dy) && surrounds.push(V(elf.x + dx, elf.y + dy))
    )
  );
  if (surrounds.every((v) => !elves.has(JSON.stringify(v)))) return elf;

  for (let i = r; i < r + 4; i++) {
    const { x, y } = elf;
    // N
    if (
      i % 4 === 0 &&
      [-1, 0, 1].every((dx) => !elves.has(JSON.stringify(V(x + dx, y - 1))))
    )
      return V(x, y - 1);
    // S
    if (
      i % 4 === 1 &&
      [-1, 0, 1].every((dx) => !elves.has(JSON.stringify(V(x + dx, y + 1))))
    )
      return V(x, y + 1);
    // W
    if (
      i % 4 === 2 &&
      [-1, 0, 1].every((dy) => !elves.has(JSON.stringify(V(x - 1, y + dy))))
    )
      return V(x - 1, y);
    // E
    if (
      i % 4 === 3 &&
      [-1, 0, 1].every((dy) => !elves.has(JSON.stringify(V(x + 1, y + dy))))
    )
      return V(x + 1, y);
  }
  return elf;
};

const move = (elves: Map<string, Vector>, r: number) => {
  const propositions: Map<string, Vector[]> = new Map();
  for (const elf of elves.values()) {
    const nxt = JSON.stringify(trymove(elf, elves, r));
    propositions.set(nxt, [...(propositions.get(nxt) ?? []), elf]);
  }

  let moved = false;
  for (const [coords, proposants] of propositions.entries()) {
    if (proposants.length === 1) {
      const oldPos = proposants[0];
      const newPos = JSON.parse(coords);
      if (!V(newPos.x, newPos.y).eq(oldPos)) {
        moved = true;
        elves.delete(JSON.stringify(oldPos));
        elves.set(coords, V(newPos.x, newPos.y));
      }
    }
  }
  return moved;
};

const solve = (e: Map<string, Vector>, p: number) => {
  //   console.log("== Initial State ==");
  //   preview(e);
  let i = 0;
  while (move(e, i)) {
    i++;
    // console.log(`== End of Round ${i} ==`);
    // preview(e);
    if (p === 1 && i === 10) return result(bounds(e)) - e.size;
  }
  return i + 1;
};

export const part1 = () => solve(cleanInput(`${__dirname}/input.txt`), 1);

export const part2 = () => solve(cleanInput(`${__dirname}/input.txt`), 2);
