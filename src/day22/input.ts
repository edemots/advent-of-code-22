import { max } from "@utils/array";
import { readlines } from "@utils/file";

export const cleanInput = (inputPath: string): [string[], string[]] => {
  let [b, p] = readlines(inputPath, "\n\n");
  let board = b.trimEnd().split("\n");
  const mW = max(board.map((l) => l.length));
  board = board.map((l) =>
    l.length < mW
      ? l + Array.from({ length: mW - l.length }, () => " ").join("")
      : l
  );
  const path = p.match(/([A-Z]*\d+)/g) || [];
  return [board, path];
};
