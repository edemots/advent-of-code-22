const { readlines } = require("../utils/file");

const cleanInput = (inputPath) =>
  readlines(inputPath).map((l) => l.split("").map((h) => parseInt(h)));

module.exports = { cleanInput };
