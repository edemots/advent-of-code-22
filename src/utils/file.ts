import { readFileSync } from "fs";

export const readlines = (path: string, by = "\n") =>
  readFileSync(path, "utf-8").trimEnd().split(by);
