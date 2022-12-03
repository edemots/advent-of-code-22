/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
const intdiv = (a, b) => Math.floor(a / b);

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder#remainder_with_negative_dividend
 * @param {number} n
 * @param {number} d
 * @returns {number}
 */
const mod = (n, d) => ((n % d) + d) % d;

module.exports = { intdiv, mod };
