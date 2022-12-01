/**
 *
 * @param {string} separator
 * @param {string[]} haystack
 */
const chunkBy = (separator, haystack) => {
  const chunks = [];
  let separatorIndex = haystack.indexOf(separator);

  do {
    chunks.push(haystack.slice(0, separatorIndex));
    haystack.splice(0, separatorIndex + 1);
    separatorIndex = haystack.indexOf(separator);
  } while (separatorIndex >= 0);

  return chunks;
};

/**
 *
 * @param {number[]} values
 * @returns number
 */
const sum = (values) => values.reduce((acc, value) => acc + value, 0);

/**
 *
 * @param {number[]} values
 * @param {number} amount
 * @returns number|number[]
 */
const max = (values, amount = 1) => {
  const maximums = sort(values, "desc").slice(0, amount);

  return maximums.length > 1 ? maximums : maximums[0];
};

/**
 *
 * @param {number[]} values
 * @param {"asc"|"desc"} order
 * @returns number[]
 */
const sort = (values, order = "asc") => {
  if (!["asc", "desc"].includes(order))
    throw new Error("order must be `asc` or `desc`");

  return values.sort((a, b) => (order === "asc" ? a - b : b - a));
};

module.exports = { chunkBy, max, sum };
