import { readlines } from "@utils/file";
import { V, Vector } from "@utils/vector";

export const cleanInput = (inputPath: string) => {
  const elves: Map<string, Vector> = new Map();
  readlines(inputPath).forEach((l, y) => {
    l.split("").forEach((c, x) => {
      c === "#" && elves.set(JSON.stringify(V(x, y)), V(x, y));
    });
  });
  return elves;
};
