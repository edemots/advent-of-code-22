/**
 *
 * @param {string} str
 * @returns
 */
const capitalize = (str) =>
  str
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.substring(1))
    .join(" ");

module.exports = { capitalize };
