const inquirer = require("inquirer");
const { dirs, files } = require("./utils/fs");
const { capitalize } = require("./utils/string");

function ask() {
  const days = dirs(__dirname, /^day\d+/).map(({ name: dirName }) => ({
    name: `${capitalize(dirName.substring(0, 3))} ${parseInt(
      dirName.substring(3)
    )}`,
    value: dirName,
  }));

  inquirer
    .prompt([
      {
        type: "list",
        name: "day",
        message: "Which day?",
        choices: days,
        default: days.length - 1,
      },
    ])
    .then(({ day }) => {
      const dayDir = `${__dirname}/${day}`;

      inquirer
        .prompt([
          {
            type: "list",
            name: "part",
            message: "Which part?",
            choices: [
              { name: "Part 01", value: "part1" },
              { name: "Part 02", value: "part2" },
              new inquirer.Separator(),
              { name: "Change day", value: "back" },
            ],
            default: 1,
          },
        ])
        .then(({ part }) => {
          if (part === "back") {
            ask();
          } else {
            const p1 = performance.now();
            const solution = require(`${dayDir}`)[part]();
            const p2 = performance.now();
            console.log(
              "\033[42m The solution is: \033[1m" +
                solution +
                "\033[22m" +
                ` (took ${Math.ceil((p2 - p1) * 100) / 100} ms) ` +
                "\033[0m"
            );

            inquirer
              .prompt([
                {
                  type: "confirm",
                  name: "another",
                  message: "Another? (Default: Yes)",
                  default: true,
                },
              ])
              .then(({ another }) => {
                if (another) ask();
                else console.log("Thank you for solving AOC 22! ✨");
              });
          }
        });
    });
}

if (require.main === module) {
  ask();
}
