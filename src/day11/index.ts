import { max, multiply, range } from "@utils/array";
import { intdiv } from "@utils/number";
import { cleanInput } from "./input";

const play = (input: string, rounds: number) => {
  const monkeys = cleanInput(input);
  const modulo = multiply(monkeys.map((m) => m.divider));

  range(1, rounds).forEach((_) => {
    monkeys.forEach(({ worryLevels, op, divider, tMonkey, fMonkey }, i) => {
      worryLevels.forEach((worryLevel) => {
        const newWL =
          rounds > 20 ? op(worryLevel) % modulo : intdiv(op(worryLevel), 3);
        if (newWL % divider === 0) monkeys[tMonkey].worryLevels.push(newWL);
        else monkeys[fMonkey].worryLevels.push(newWL);
      });
      monkeys[i].worryLevels = [];
      monkeys[i].iter += worryLevels.length;
    });
  });

  return multiply(
    max(
      monkeys.map((m) => m.iter),
      2
    )
  );
};

export const part1 = () => play(`${__dirname}/input.txt`, 20);

export const part2 = () => play(`${__dirname}/input.txt`, 10000);
