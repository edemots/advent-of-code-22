const fs = require("fs");

const readlines = (path) => fs.readFileSync(path, "utf-8").trim().split("\n");

module.exports = { readlines };
