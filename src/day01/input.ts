import { chunkBy } from "@utils/array";
import { readlines } from "@utils/file";

export const cleanInput = (inputPath: string) =>
  chunkBy<string | number>(
    "",
    readlines(inputPath).map((line) =>
      line.length > 0 ? parseInt(line) : line
    )
  ) as number[][];
