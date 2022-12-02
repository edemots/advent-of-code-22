const { readlines } = require("../utils/file");

const cleanInput = (inputPath) => readlines(inputPath);

module.exports = { cleanInput };
