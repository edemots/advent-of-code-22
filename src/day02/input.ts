import { readlines } from "@utils/file";

const opponent = ["A", "B", "C"];
const me = ["X", "Y", "Z"];

export const cleanInput = (inputPath: string) =>
  readlines(inputPath).map((round) => {
    const roundMoves = round.split(" ");
    return [opponent.indexOf(roundMoves[0]) + 1, me.indexOf(roundMoves[1]) + 1];
  });
