import { tail } from "@utils/array";
import { readlines } from "@utils/file";
import { ints } from "@utils/string";

export const cleanInput = (inputPath: string) => {
  const valves: string[] = [];
  const flows: number[] = [];
  const conns: string[][] = [];

  readlines(inputPath).map((l) => {
    valves.push(/Valve ([A-Z]{2}) has/.exec(l)?.[1] as string);
    flows.push(tail(ints(l)));
    conns.push((/to valves? (.*)/.exec(l)?.[1] as string).split(", "));
  });

  return { valves, flows, conns };
};
