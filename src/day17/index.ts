import * as math from "mathjs";
import { cleanInput } from "./input";
import { max } from "@utils/array";
import { intdiv } from "@utils/number";

const ROCKS = [
  [
    math.complex(0, 0),
    math.complex(1, 0),
    math.complex(2, 0),
    math.complex(3, 0),
  ],
  [
    math.complex(0, 1),
    math.complex(1, 1),
    math.complex(2, 1),
    math.complex(1, 2),
    math.complex(1, 0),
  ],
  [
    math.complex(0, 0),
    math.complex(1, 0),
    math.complex(2, 0),
    math.complex(2, 1),
    math.complex(2, 2),
  ],
  [
    math.complex(0, 0),
    math.complex(0, 1),
    math.complex(0, 2),
    math.complex(0, 3),
  ],
  [
    math.complex(0, 0),
    math.complex(1, 0),
    math.complex(0, 1),
    math.complex(1, 1),
  ],
];

const DOWN = math.complex(0, -1);

let chamber = new Set(
  Array.from({ length: 7 }, (_, i) => JSON.stringify(math.complex(i, -1)))
);

const chamberHeight = (set: Set<string>) =>
  max([...set].map((c) => JSON.parse(c).im));

export const part1 = () => {
  const wind = cleanInput(`${__dirname}/input.txt`);
  let windCycle = 0;

  for (let i = 0; i < 2022; i++) {
    const start = math.complex(2, 4 + chamberHeight(chamber));
    let rock = ROCKS[i % ROCKS.length].map((c) => math.add(start, c));

    while (1) {
      const w = wind[windCycle % wind.length];

      let newRock = rock.map((c) => math.add(c, w));
      if (
        newRock.every((c) => c.re >= 0 && c.re < 7) &&
        !newRock.some((c) => chamber.has(JSON.stringify(c)))
      ) {
        rock = newRock;
      }
      windCycle++;

      newRock = rock.map((c) => math.add(c, DOWN));
      if (newRock.some((c) => chamber.has(JSON.stringify(c)))) {
        rock.forEach((c) => chamber.add(JSON.stringify(c)));
        break;
      }
      rock = newRock;
    }
  }

  return chamberHeight(chamber) + 1;
};

export const part2 = () => {
  const ROUNDS = 1000000000000;

  const wind = cleanInput(`${__dirname}/input.txt`);
  let r = 0;
  let windCycle = 0;
  let height = 0;
  let delta = 0;
  let foundCyc = false;

  let registry: Record<string, { r: number; height: number }> = {};
  while (r < ROUNDS) {
    height = chamberHeight(chamber);
    const start = math.complex(2, 4 + chamberHeight(chamber));

    const rockIdx = r % ROCKS.length;
    let wIdx = windCycle % wind.length;

    if (!foundCyc) {
      const h = [...chamber]
        .filter((c) => height - JSON.parse(c).im <= 20)
        .map((c) => math.complex(JSON.parse(c).re, JSON.parse(c).im - height))
        .join("");

      const key = `${rockIdx}.${wIdx}.${h}`;
      if (key in registry) {
        const { r: lastR, height: lastH } = registry[key];
        const cycLen = r - lastR;
        const remCyc = intdiv(ROUNDS - r, cycLen);
        r += remCyc * cycLen;
        delta = remCyc * (height - lastH);
        foundCyc = true;
      }

      registry[key] = { r, height };
    }

    r++;
    let rock = ROCKS[rockIdx].map((c) => math.add(start, c));

    while (1) {
      const w = wind[wIdx];
      wIdx = ++windCycle % wind.length;

      let newRock = rock.map((c) => math.add(c, w));
      if (
        newRock.every((c) => c.re >= 0 && c.re < 7) &&
        !newRock.some((c) => chamber.has(JSON.stringify(c)))
      ) {
        rock = newRock;
      }

      newRock = rock.map((c) => math.add(c, DOWN));
      if (newRock.some((c) => chamber.has(JSON.stringify(c)))) {
        rock.forEach((c) => chamber.add(JSON.stringify(c)));
        height = chamberHeight(chamber) + 1;
        break;
      }
      rock = newRock;
    }
  }

  return height + delta;
};
