const { readlines } = require("../utils/file");

const cleanInput = (inputPath) => readlines(inputPath, "\n\n");

module.exports = { cleanInput };
