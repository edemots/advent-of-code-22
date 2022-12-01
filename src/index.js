const fs = require("fs");
const inquirer = require("inquirer");
const { dirs, files } = require("./utils/fs");
const { capitalize } = require("./utils/string");

if (require.main === module) {
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
            choices: parts,
          },
        ])
        .then(({ part }) => {
          const solution = require(`${dayDir}/${part}`).solve();
          console.log(`The solution is: ${solution}`);
        });
    });
}
