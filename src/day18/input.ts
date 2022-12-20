import { readlines } from "@utils/file";
import { ints } from "@utils/string";
import { V } from "@utils/vector";

export const cleanInput = (inputPath: string) =>
  readlines(inputPath).map((l) => {
    const [x, y, z] = ints(l);
    return V(x, y, z);
  });
