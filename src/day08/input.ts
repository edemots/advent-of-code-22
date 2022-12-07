import { readlines } from "@utils/file";

export const cleanInput = (inputPath: string) =>
  readlines(inputPath).map((l) => l.split("").map((h) => parseInt(h)));
