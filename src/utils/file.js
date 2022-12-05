const fs = require("fs");

/**
 * @param {string} path
 * @returns {string[]}
 */
const readlines = (path, by = "\n") =>
  fs.readFileSync(path, "utf-8").trimEnd().split(by);

module.exports = { readlines };
