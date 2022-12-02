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
      const parts = files(dayDir, /^part\d+/).map(({ name: fileName }) => ({
        name: `${capitalize(fileName.substring(0, 4))} ${parseInt(
          fileName.substring(4)
        )}`,
        value: fileName,
      }));

      inquirer
        .prompt([
          {
            type: "list",
            name: "part",
            message: "Which part?",
            choices: [
              ...parts,
              new inquirer.Separator(),
              { name: "Change day", value: "back" },
            ],
            default: parts.length - 1,
          },
        ])
        .then(({ part }) => {
          if (part === "back") {
            ask();
          } else {
            const solution = require(`${dayDir}/${part}`).solve();
            console.log(
              "\033[42m The solution is: \033[1m" +
                solution +
                "\033[21;24m \033[0m"
            );
          }
        });
    });
}

if (require.main === module) {
  ask();
}
