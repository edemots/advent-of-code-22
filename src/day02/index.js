const { sum } = require("../utils/array");
const { mod } = require("../utils/number");
const { cleanInput } = require("./input");

const part1 = () =>
  sum(
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
        myMove + mod(myMove - opponentMove + 1, 3) * 3
    )
  );

const part2 = () =>
  sum(
    cleanInput(`${__dirname}/input.txt`).map(
      ([opponentMove, expectedOutcome]) =>
        /**
         * opponentMove: 1 => Rock, 2 => Paper, 3 => Scissors
         * expectedOutcome: 1 => lose, 2 => draw, 3 => win
         *
         * (opponentMove + expectedOutcome).mod(3)
         * 1. we add the values of the opponent's move and of the outcome, modulo 3
         *
         * (opponentMove + expectedOutcome).mod(3) + 1
         * 2. then we add one to it in order to find the move to play
         *      (1 + 2) % 3 + 1 = 1 => I should play Rock (to draw (2) against Rock (1))
         *      (3 + 1) % 3 + 1 = 2 => I should play Paper (to lose (1) against Scissors (3))
         *      (2 + 3) % 3 + 1 = 3 => I should play Scissors (to win (3) against Paper (2))
         *      ...
         *
         * (opponentMove + expectedOutcome).mod(3) + 1 + (expectedOutcome - 1) * 3
         * 3. finally we multiply the expectedOutcome by 3 to get the points that we should earn
         *      draw against Rock: 1 (Rock) + 3 (draw) = 4
         *      lose against Scissors: 2 (Paper) + 0 (lose) = 2
         *      win against Paper: 3 (Scissors) + 6 (win) = 9
         */
        mod(opponentMove + expectedOutcome, 3) + 1 + (expectedOutcome - 1) * 3
    )
  );

module.exports = { part1, part2 };
