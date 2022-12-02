const { sum } = require("../utils/array");
const { cleanInput } = require("./input");

function solve() {
  return sum(
    cleanInput(`${__dirname}/input.txt`).map(
      ([opponentMove, myMove]) =>
        /**
         * myMove: 1 => Rock, 2 => Paper, 3 => Scissors (same for opponentMove)
         * 1. we take the value of the move
         *
         * myMove + (myMove - opponentMove + 1).mod(3)
         * 2. first we calculate the difference between the two moves: (myMove - opponentMove)
         *      -2 => win
         *      -1 => lose
         *      0 => draw
         *      1 => win
         *      2 => lose
         * 3. then we add 1 to the difference and take the rest of the division by 3: (myMove - opponentMove + 1).mod(3)
         *      (-2 + 1) % 3 = 2 => win
         *      (-1 + 1) % 3 = 0 => lose
         *      (0 + 1) % 3 = 1 => draw
         *      (1 + 1) % 3 = 2 => win
         *      (2 + 1) % 3 = 0 => lose
         *
         * myMove + (myMove - opponentMove + 1).mod(3) * 3
         * 4. finally we multiply the result by 3 to get the final points
         *      myMove + 6 => win
         *      myMove + 3 => draw
         *      myMove + 0 => lose
         */
        myMove + (myMove - opponentMove + 1).mod(3) * 3
    )
  );
}

module.exports = { solve };
