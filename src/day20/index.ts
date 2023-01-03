import { cleanInput } from "./input";

const mix = (seq: number[][], n: number) => {
  const L = seq.length;
  const nSeq = seq.slice(0);

  for (let r = 0; r < n; r++) {
    const bSeq = seq.slice(0);

    for (let index = 0; index < L; index++) {
      const curr = bSeq.shift() || [0, 0];
      if (curr[1] === 0) continue;

      const i = nSeq.findIndex((s) => s[0] === index);
      const key = (i + curr[1]) % (L - 1);

      nSeq.splice(i, 1);
      nSeq.splice(key, 0, curr);
    }
  }
  const zI = nSeq.findIndex((s) => s[1] === 0);

  return (
    nSeq[(zI + 1000) % L][1] +
    nSeq[(zI + 2000) % L][1] +
    nSeq[(zI + 3000) % L][1]
  );
};

export const part1 = (example = false) =>
  mix(cleanInput(`${__dirname}/${example ? "example-" : ""}input.txt`), 1);

const KEY = 811589153;
export const part2 = (example = false) =>
  mix(
    cleanInput(`${__dirname}/${example ? "example-" : ""}input.txt`).map(
      (s) => [s[0], s[1] * KEY]
    ),
    10
  );
