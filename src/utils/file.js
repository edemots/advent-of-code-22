const fs = require("fs");

/**
 * @param {string} path
 * @returns {string[]}
 */
const readlines = (path) => fs.readFileSync(path, "utf-8").trim().split("\n");

module.exports = { readlines };
