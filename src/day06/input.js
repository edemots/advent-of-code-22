const { readlines } = require("../utils/file");

const cleanInput = (inputPath) => readlines(inputPath)[0].split("");

module.exports = { cleanInput };
