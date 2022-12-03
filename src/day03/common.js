const { ord } = require("../utils/string");

const priority = (c) => {
  if (c >= "a" && c <= "z") return ord(c) - ord("a") + 1;
  if (c >= "A" && c <= "Z") return ord(c) - ord("A") + 27;
};

module.exports = { priority };
