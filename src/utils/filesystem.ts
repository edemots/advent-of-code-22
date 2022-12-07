import { readdirSync, Dirent } from "fs";

export const readdir = (
  dir: string,
  regexp: string | RegExp | null = null
): Dirent[] =>
  readdirSync(dir, { withFileTypes: true }).filter((path) =>
    regexp ? path.name.match(regexp) : true
  );

export const dirs = (dir: string, regexp: string | RegExp | null = null) =>
  readdir(dir, regexp).filter((path) => path.isDirectory());

export const files = (dir: string, regexp: string | null = null) =>
  readdir(dir, regexp).filter((path) => path.isFile());
