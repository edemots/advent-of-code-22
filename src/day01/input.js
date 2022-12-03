const { chunkBy } = require("../utils/array");
const { readlines } = require("../utils/file");

const cleanInput = (inputPath) =>
  chunkBy(
    "",
    readlines(inputPath).map((line) =>
      line.length > 0 ? parseInt(line) : line
    )
  );

module.exports = { cleanInput };
