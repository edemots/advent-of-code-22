import { max, min } from "@utils/array";
import { cleanInput } from "./input";

let valves: string[];
let flows: number[];
let conns: string[][];
let distances: number[][] = [];

const makeCacheable = (f: Function) => {
  const registry: Record<
    string,
    Record<string, Record<string, Record<string, number>>>
  > = {};
  return (...args: any[]) => {
    const [arg1, arg2, arg3, arg4] = args;
    if (arg1 in registry)
      if (arg2 in registry[arg1])
        if (arg3 in registry[arg1][arg2])
          if (arg4 in registry[arg1][arg2][arg3])
            return registry[arg1][arg2][arg3][arg4];

    const res = f(arg1, arg2, arg3, arg4);
    if (!registry[arg1]) registry[arg1] = {};
    if (!registry[arg1][arg2]) registry[arg1][arg2] = {};
    if (!registry[arg1][arg2][arg3]) registry[arg1][arg2][arg3] = {};
    registry[arg1][arg2][arg3][arg4] = res;
    return res;
  };
};

const release = makeCacheable(
  (
    valve: string,
    rest: string[],
    time: number,
    elephant: boolean = false
  ): number => {
    let pressure = elephant ? release("AA", rest, 26, false) : 0;
    let remtime;
    for (const v of rest) {
      const dist = distances[valves.indexOf(valve)][valves.indexOf(v)];
      if ((remtime = time - dist - 1) >= 0) {
        pressure = max([
          pressure,
          flows[valves.indexOf(v)] * remtime +
            release(
              v,
              rest.filter((valve) => valve !== v),
              remtime,
              elephant
            ),
        ]);
      }
    }
    return pressure;
  }
);

export const part1 = () => {
  const input = cleanInput(`${__dirname}/input.txt`);
  valves = input.valves;
  flows = input.flows;
  conns = input.conns;

  for (let i = 0; i < valves.length; i++) {
    distances[i] = [];
    for (let j = 0; j < valves.length; j++) {
      distances[i][j] = Infinity;
      if (conns[i].includes(valves[j])) distances[i][j] = 1;
    }
  }
  // Roy-Floyd-Warshall
  for (let k = 0; k < distances.length; k++)
    for (let i = 0; i < distances.length; i++)
      for (let j = 0; j < distances.length; j++)
        distances[i][j] = min([
          distances[i][j],
          distances[i][k] + distances[k][j],
        ]);

  return release(
    "AA",
    valves.filter((_, i) => flows[i] > 0),
    30
  );
};

export const part2 = () => {
  const input = cleanInput(`${__dirname}/input.txt`);
  valves = input.valves;
  flows = input.flows;
  conns = input.conns;
  for (let i = 0; i < valves.length; i++) {
    distances[i] = [];
    for (let j = 0; j < valves.length; j++) {
      distances[i][j] = Infinity;
      if (conns[i].includes(valves[j])) distances[i][j] = 1;
    }
  }
  // Roy-Floyd-Warshall
  for (let k = 0; k < distances.length; k++)
    for (let i = 0; i < distances.length; i++)
      for (let j = 0; j < distances.length; j++)
        distances[i][j] = min([
          distances[i][j],
          distances[i][k] + distances[k][j],
        ]);

  return release(
    "AA",
    valves.filter((_, i) => flows[i] > 0),
    26,
    true
  );
};
