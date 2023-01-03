import { readlines } from "@utils/file";

export const cleanInput = (inputPath: string) =>
  readlines(inputPath).map((n, k) => [k, parseInt(n)]);
