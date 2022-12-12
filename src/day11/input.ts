import { tail } from "@utils/array";
import { readlines } from "@utils/file";
import { ints } from "@utils/string";

export const cleanInput = (inputPath: string) =>
  readlines(inputPath, "\n\n").map((round) => {
    const [, startingItems, operation, test, trueMonkey, falseMonkey] =
      round.split("\n");

    const worryLevels = ints(startingItems);
    const op = (worryLevel: number) =>
      eval(tail(operation.split("=")).replaceAll("old", worryLevel.toString()));
    const [divider] = ints(test);
    const [tMonkey] = ints(trueMonkey);
    const [fMonkey] = ints(falseMonkey);

    return { worryLevels, op, divider, tMonkey, fMonkey, iter: 0 };
  });
