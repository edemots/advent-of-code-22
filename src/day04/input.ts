import { readlines } from "@utils/file";

export const cleanInput = (inputPath: string) =>
  readlines(inputPath).map((l) =>
    l
      .replaceAll("-", ",")
      .split(",")
      .map((section) => parseInt(section))
  );
