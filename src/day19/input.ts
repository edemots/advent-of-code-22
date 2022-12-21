import { readlines } from "@utils/file";
import { ints } from "@utils/string";

export const cleanInput = (inputPath: string) =>
  readlines(inputPath).map(
    (l) => ints(l) as [number, number, number, number, number, number, number]
  );
