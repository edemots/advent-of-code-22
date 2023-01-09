import { readlines } from "@utils/file";
import { V, Vector } from "@utils/vector";

export const DIRS: Record<string, Vector> = {
  ">": V(1, 0),
  v: V(0, 1),
  "<": V(-1, 0),
  "^": V(0, -1),
};

export type Blizzard = Vector & {
  direction: Vector;
};

export const cleanInput = (inputPath: string) => {
  const m = readlines(inputPath).map((l) => l.split(""));
  const blizzards: Blizzard[] = [];
  for (let y = 1; y < m.length - 1; y++) {
    for (let x = 1; x < m[y].length - 1; x++) {
      if (m[y][x] !== ".")
        blizzards.push({
          ...V(x - 1, y - 1),
          direction: DIRS[m[y][x]],
        } as Blizzard);
    }
  }

  return { blizzards, fx: m[0].length - 2, fy: m.length - 2 };
};
