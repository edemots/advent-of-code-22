const fs = require("fs");
const inquirer = require("inquirer");

const todaysDay = new Intl.DateTimeFormat("fr-FR", { day: "2-digit" }).format(
  Date.now()
);

if (require.main === module) {
  const dayDir = `${__dirname}/day02`;
  if (fs.existsSync(dayDir)) {
    console.log("Come back tomorrow");
    return;
  }

  const ui = new inquirer.ui.BottomBar();

  ui.log.write(`Starting day ${todaysDay} ☀️`);
  ui.log.write(new inquirer.Separator());

  fs.mkdirSync(dayDir, { recursive: true, mode: 0o755 });
  const files = {
    "example-input.txt": "",
    "input.txt": "",
    "input.js": fs.readFileSync(`${__dirname}/stubs/input.js`),
    "part01.js": fs.readFileSync(`${__dirname}/stubs/part.js`),
  };
  Object.entries(files).forEach(([file, data]) => {
    const filePath = `${dayDir}/${file}`;
    const stream = fs.createWriteStream(filePath);
    if (data !== "") {
      stream.write(data);
    }
    stream.close();
  });

  ui.log.write("Your files are ready at:");
  ui.log.write(dayDir);
  Object.keys(files).forEach((file) => {
    ui.log.write(` - ${file}`);
  });

  ui.log.write("\nHave a nice day ✨");

  ui.close();
}
