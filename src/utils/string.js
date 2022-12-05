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

/**
 * @param {string} s
 * @param {number} n
 * @returns string[]
 */
const chunk = (s, n) => s.match(new RegExp(".{1," + n + "}", "g"));

/**
 * @param {string} s
 * @returns number[]
 */
const ints = (s) => s.match(/\d+/g).map((digit) => parseInt(digit));

module.exports = { capitalize, chunk, ints, ord };
