import { readlines } from "@utils/file";

export const cleanInput = (inputPath: string) =>
  readlines(inputPath).reduce<Record<string, any>>((acc, curr) => {
    const [m, o] = curr.split(": ");
    return (acc[m] = o), acc;
  }, {});
