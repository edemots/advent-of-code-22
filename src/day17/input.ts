import * as math from "mathjs";
import { readlines } from "@utils/file";

export const cleanInput = (inputPath: string) =>
  readlines(inputPath)[0]
    .split("")
    .map((dir) => math.complex(dir === ">" ? 1 : -1, 0));
