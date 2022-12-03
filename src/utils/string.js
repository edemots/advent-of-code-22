/**
 *
 * @param {string} str
 * @returns {string}
 */
const capitalize = (str) =>
  str
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.substring(1))
    .join(" ");

/**
 *
 * @param {char} c
 * @returns {number}
 */
const ord = (c) => c.charCodeAt();

module.exports = { capitalize, ord };
