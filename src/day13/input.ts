import { readlines } from "@utils/file";

export type List = number | List[];

export const part1CleanInput = (inputPath: string) =>
  readlines(inputPath, "\n\n").map((packet) =>
    packet.split("\n").map<List>((list) => JSON.parse(list))
  );

export const part2CleanInput = (inputPath: string) =>
  readlines(inputPath, "\n\n").flatMap((packet) =>
    packet.split("\n").map<List>((list) => JSON.parse(list))
  );
