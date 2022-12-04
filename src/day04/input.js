const { arrayFromRange } = require("../utils/array");
const { readlines } = require("../utils/file");

const cleanInput = (inputPath) =>
  readlines(inputPath).map((l) =>
    l
      .replaceAll("-", ",")
      .split(",")
      .map((section) => parseInt(section))
  );

module.exports = { cleanInput };
