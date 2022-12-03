const fs = require("fs");

/**
 *
 * @param {string} dir
 * @param {string} regexp
 * @returns {fs.Dirent[]}
 */
const readdir = (dir, regexp = null) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((path) => (regexp ? path.name.match(regexp) : true));

/**
 *
 * @param {string} dir
 * @param {string} regexp
 * @returns {fs.Dirent[]}
 */
const dirs = (dir, regexp = null) =>
  readdir(dir, regexp).filter((path) => path.isDirectory());

/**
 *
 * @param {string} dir
 * @param {string} regexp
 * @returns {fs.Dirent[]}
 */
const files = (dir, regexp = null) =>
  readdir(dir, regexp).filter((path) => path.isFile());

module.exports = { dirs, files };
