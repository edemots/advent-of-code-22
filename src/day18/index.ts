import { max } from "@utils/array";
import { V, Vector } from "@utils/vector";
import { min } from "mathjs";
import { cleanInput } from "./input";

const offsets = [
  V(1, 0, 0),
  V(0, 1, 0),
  V(0, 0, 1),
  V(-1, 0, 0),
  V(0, -1, 0),
  V(0, 0, -1),
];

export const part1 = () => {
  const droplet = new Set(
    cleanInput(`${__dirname}/input.txt`).map((c) => JSON.stringify(c))
  );

  return [...droplet]
    .flatMap((c) =>
      offsets.map((o) => {
        const v = JSON.parse(c);
        return V(v.x, v.y, v.z).add(o);
      })
    )
    .filter((c) => !droplet.has(JSON.stringify(c))).length;
};

export const part2 = () => {
  const droplet = new Set(
    cleanInput(`${__dirname}/input.txt`).map((c) => JSON.stringify(c))
  );
  let reached = 0;

  const bounds = {
    minx: min([...droplet].map((c) => JSON.parse(c).x)) - 1,
    maxx: max([...droplet].map((c) => JSON.parse(c).x)) + 1,
    miny: min([...droplet].map((c) => JSON.parse(c).y)) - 1,
    maxy: max([...droplet].map((c) => JSON.parse(c).y)) + 1,
    minz: min([...droplet].map((c) => JSON.parse(c).z)) - 1,
    maxz: max([...droplet].map((c) => JSON.parse(c).z)) + 1,
  };

  const queue = [V(bounds["minx"], bounds["miny"], bounds["minz"])];
  const visited = new Set(queue.map((c) => JSON.stringify(c)));

  while (queue.length > 0) {
    const c = queue.shift() as Vector;
    visited.add(JSON.stringify(c));

    for (const o of offsets) {
      const nc = c.add(o);

      if (visited.has(JSON.stringify(nc))) continue;

      if (
        nc.x < bounds["minx"] ||
        nc.x > bounds["maxx"] ||
        nc.y < bounds["miny"] ||
        nc.y > bounds["maxy"] ||
        (nc.z && (nc.z < bounds["minz"] || nc.z > bounds["maxz"]))
      ) {
        continue;
      }

      if (droplet.has(JSON.stringify(nc))) {
        reached++;
        continue;
      }

      queue.push(nc);
      visited.add(JSON.stringify(nc));
    }
  }

  return reached;
};
