export const capitalize = (str: string) =>
  str
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.substring(1))
    .join(" ");

export const ord = (c: string) => c.charCodeAt(0);

export const chunk = (s: string, n: number) =>
  s.match(new RegExp(".{1," + n + "}", "g"));

export const ints = (s: string) =>
  s.match(/-?\d+/g)?.map((digit) => parseInt(digit)) || [];
