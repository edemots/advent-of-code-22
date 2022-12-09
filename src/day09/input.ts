import { readlines } from "@utils/file";
import { V } from "@utils/vector";

export const Directions = {
  R: V(1, 0),
  L: V(-1, 0),
  U: V(0, 1),
  D: V(0, -1),
};

export const cleanInput = (inputPath: string) =>
  readlines(inputPath)
    .map((line) => line.split(" "))
    .map(([direction, count]) => ({
      direction: Directions[direction as keyof typeof Directions],
      count: parseInt(count),
    }));
