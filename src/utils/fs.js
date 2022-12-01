const fs = require("fs");

/**
 *
 * @param {string} dir
 * @param {string} regexp
 * @returns string[]
 */
const readdir = (dir, regexp = null) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((path) => (regexp ? path.name.match(regexp) : true));

const dirs = (dir, regexp = null) =>
  readdir(dir, regexp).filter((path) => path.isDirectory());

const files = (dir, regexp = null) =>
  readdir(dir, regexp).filter((path) => path.isFile());

module.exports = { dirs, files };
