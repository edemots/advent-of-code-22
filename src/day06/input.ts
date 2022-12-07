import { readlines } from "@utils/file";

export const cleanInput = (inputPath: string) =>
  readlines(inputPath)[0].split("");
