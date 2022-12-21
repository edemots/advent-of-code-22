import { multiply, range, sum, tail } from "@utils/array";
import { intdiv } from "@utils/number";
import { max } from "mathjs";
import { cleanInput } from "./input";

interface Resources extends Record<string, number> {
  ore: number;
  clay: number;
  obs: number;
  geode: number;
}

interface Bots extends Record<string, number> {
  ore: number;
  clay: number;
  obs: number;
  geode: number;
}

const solve = (
  [
    bpId,
    oreBotOreCost,
    clayBotOreCost,
    obsBotOreCost,
    obsBotClayCost,
    geodeBotOreCost,
    geodeBotObsCost,
  ]: [number, number, number, number, number, number, number],
  minutes: number
) => {
  let res = 0;
  const maxOreCost = max([
    oreBotOreCost,
    clayBotOreCost,
    obsBotOreCost,
    geodeBotOreCost,
  ]);

  const qualityLvl = (minute: number, resources: Resources, bots: Bots) => {
    const geodesIdle = resources.geode + bots.geode * minute;
    if (geodesIdle > res) res = geodesIdle;
    const geodes = geodesIdle + intdiv(minute * (minute - 1), 2);
    if (geodes <= res) return;
    const botToBuild = (cost: Resources) => {
      const timeSpent = range(0, 3).map((i) => {
        const r = Object.values(resources)[i];
        const b = Object.values(bots)[i];
        const c = Object.values(cost)[i];
        if (r >= c) return 0;
        if (b) return intdiv(c - r + b - 1, b);
        return null;
      });
      return timeSpent.every((t) => t !== null)
        ? max(timeSpent as number[])
        : null;
    };
    const costs: Record<string, Resources> = {
      geode: { ore: geodeBotOreCost, clay: 0, obs: geodeBotObsCost, geode: 0 },
      obs: { ore: obsBotOreCost, clay: obsBotClayCost, obs: 0, geode: 0 },
      clay: { ore: clayBotOreCost, clay: 0, obs: 0, geode: 0 },
      ore: { ore: oreBotOreCost, clay: 0, obs: 0, geode: 0 },
    };

    for (const [bot, cost] of Object.entries(costs)) {
      if (bot == "ore" && bots[bot] >= maxOreCost) continue;
      if (bot == "clay" && bots[bot] >= obsBotClayCost) continue;
      if (bot == "obs" && bots[bot] >= geodeBotObsCost) continue;
      const time = botToBuild(cost);
      if (time !== null && time < minute) {
        const nBots = { ...bots };
        nBots[bot]++;
        qualityLvl(
          minute - time - 1,
          Object.fromEntries(
            Object.entries(resources).map(([r, amR]) => [
              r,
              amR + bots[r] * (time + 1) - cost[r],
            ])
          ) as Resources,
          nBots
        );
      }
    }
  };

  qualityLvl(
    minutes,
    { ore: 0, clay: 0, obs: 0, geode: 0 },
    { ore: 1, clay: 0, obs: 0, geode: 0 }
  );

  return [bpId, res];
};

export const part1 = () =>
  sum(
    cleanInput(`${__dirname}/input.txt`).map((bp) => multiply(solve(bp, 24)))
  );

export const part2 = () =>
  multiply(
    cleanInput(`${__dirname}/input.txt`)
      .slice(0, 3)
      .map((bp) => tail(solve(bp, 32)))
  );
