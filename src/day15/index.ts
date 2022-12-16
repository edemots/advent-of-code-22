import { max, range } from "@utils/array";
import { V, Vector } from "@utils/vector";
import { cleanInput, Signal, taxicabDist } from "./input";

const canExistAt = (at: Vector, signals: Signal[]) => {
  for (const s of signals) {
    if (taxicabDist(at, V(s.x, s.y)) <= s.beaconDist) return false;
  }
  return true;
};

export const part1 = (example = false) => {
  const Y_TARGET = example ? 10 : 2000000;

  const { signals, beacons, minX, maxX } = cleanInput(
    `${__dirname}/${example ? "example-" : ""}input.txt`
  );

  let forbPos = 0;
  range(minX, maxX).forEach((x) => {
    const b = V(x, Y_TARGET);
    if (!canExistAt(b, signals) && !beacons.has(JSON.stringify(b))) forbPos++;
  });

  return forbPos;
};

export const part2 = (example = false) => {
  const MIN_BOUND = 0;
  const MAX_BOUND = 4000000;

  const { signals } = cleanInput(
    `${__dirname}/${example ? "example-" : ""}input.txt`
  );

  const maxX = max(signals.map((s) => s.x));
  const maxY = max(signals.map((s) => s.y));

  for (const s of signals) {
    for (let dx = 0; dx < s.beaconDist + 2; dx++) {
      const dy = s.beaconDist + 1 - dx;
      for (const v of [V(-1, -1), V(-1, 1), V(1, -1), V(1, 1)]) {
        const x = s.x + dx * v.x;
        const y = s.y + dy * v.y;
        if (x < MIN_BOUND || x > maxX || y < MIN_BOUND || y > maxY) continue;
        if (canExistAt(V(x, y), signals)) return x * MAX_BOUND + y;
      }
    }
  }
};
