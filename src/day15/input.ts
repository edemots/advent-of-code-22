import { chunk } from "@utils/array";
import { readlines } from "@utils/file";
import { ints } from "@utils/string";
import { V, Vector } from "@utils/vector";

export interface Signal {
  x: number;
  y: number;
  beaconDist: number;
}

export interface Beacon {
  x: number;
  y: number;
}

export const taxicabDist = (v1: Vector, v2: Vector) =>
  Math.abs(v1.x - v2.x) + Math.abs(v1.y - v2.y);

export const cleanInput = (inputPath: string) => {
  const signals: Signal[] = [];
  const beacons: Set<string> = new Set();
  let minX = Infinity;
  let maxX = -Infinity;

  readlines(inputPath)
    .flatMap((l) =>
      chunk(
        chunk(ints(l), 2).map((coords) => V(coords[0], coords[1])),
        2
      )
    )
    .forEach((c) => {
      beacons.add(JSON.stringify(c[1]));
      if (c[1].x < minX) minX = c[1].x;
      if (c[1].x > maxX) maxX = c[1].x;

      const s = {
        x: c[0].x,
        y: c[0].y,
        beaconDist: taxicabDist(c[0], c[1]),
      };
      if (s.x - s.beaconDist < minX) minX = s.x - s.beaconDist;
      if (s.x + s.beaconDist > maxX) maxX = s.x + s.beaconDist;

      signals.push(s);
    });

  return {
    signals,
    beacons,
    minX,
    maxX,
  };
};
