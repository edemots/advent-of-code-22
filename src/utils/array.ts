type NumberType<T> = T extends 1 ? number : number[];

export const chunk = <T>(array: T[], size = 1) => {
  let i = 0;
  const chunks = [];
  for (i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const chunkBy = <T>(separator: T, haystack: T[]): T[][] => {
  const chunks: T[][] = [];
  let separatorIndex = haystack.indexOf(separator);

  do {
    chunks.push(haystack.slice(0, separatorIndex));
    haystack.splice(0, separatorIndex + 1);
    separatorIndex = haystack.indexOf(separator);
  } while (separatorIndex >= 0);

  return chunks;
};

export const sum = (values: number[]) =>
  values.reduce((acc, value) => acc + value, 0);

export const sumIf = (values: number[], condition = (_value: number) => true) =>
  sum(values.filter(condition));

export const multiply = (values: number[]) =>
  values.reduce((acc, value) => acc * value, 1);

export const max = <T extends number = 1>(
  values: number[],
  amount?: T
): NumberType<T> => {
  const count = amount || 1;
  const maxs = sort(values, "desc").slice(0, count);
  return (count === 1 ? maxs[0] : maxs) as NumberType<T>;
};

export const min = <T extends number = 1>(
  values: number[],
  amount?: T
): NumberType<T> => {
  const count = amount || 1;
  const mins = sort(values, "asc").slice(0, count);
  return (count === 1 ? mins[0] : mins) as NumberType<T>;
};

export const sort = (values: number[], order: "asc" | "desc" = "asc") => {
  if (!["asc", "desc"].includes(order))
    throw new Error("order must be `asc` or `desc`");

  return values.sort((a, b) => (order === "asc" ? a - b : b - a));
};

export const intersect = <T>(...arrays: T[][]) => {
  const [array1, ...rest] = arrays;
  const sets = rest.map((array) => new Set(array));
  return new Set(array1.filter((i) => sets.every((s) => s.has(i))));
};

export const prefix = (array: string[]) =>
  array.reduce<string[]>(
    (prev, curr) => [
      ...prev,
      (prev[prev.length - 1] ? prev[prev.length - 1] + "." : "") + curr,
    ],
    []
  );
