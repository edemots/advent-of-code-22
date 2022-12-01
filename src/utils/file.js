const fs = require("fs");

const readlines = (path) => fs.readFileSync(path, "utf-8").split("\n");

module.exports = { readlines };
