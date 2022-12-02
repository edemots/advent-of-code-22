const { sum } = require("../utils/array");
const { cleanInput } = require("./input");

function solve() {
  return sum(
    cleanInput(`${__dirname}/input.txt`).map(
      ([opponentMove, expectedOutcome]) => {
        let myMove =
          expectedOutcome === 0 // lose
            ? opponentMove - 1
            : expectedOutcome === 1 // draw
            ? opponentMove
            : opponentMove + 1; // win
        myMove = myMove < 0 ? 2 : myMove > 2 ? 0 : myMove;

        let result = myMove - opponentMove;
        result = result < 0 ? result + 3 : result;

        if (result === 0) return 3 + myMove + 1; // draw
        if (result === 1) return 6 + myMove + 1; // win
        if (result === 2) return myMove + 1; // lose
      }
    )
  );
}

module.exports = { solve };
