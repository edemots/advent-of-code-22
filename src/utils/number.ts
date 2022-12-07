export const intdiv = (a: number, b: number) => Math.floor(a / b);

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder#remainder_with_negative_dividend
 */
export const mod = (n: number, d: number) => ((n % d) + d) % d;
