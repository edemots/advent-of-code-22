import { range, tail } from "@utils/array";
import { V, Vector } from "@utils/vector";
import { cleanInput, Directions } from "./input";

const knotDirection = (knot: Vector, parent: Vector) => {
  const knotsDistance = knot.sub(parent);
  let direction: Vector = V(0, 0);

  if (knotsDistance.eqX(2)) direction = direction.add(Directions.R);
  if (knotsDistance.eqX(-2)) direction = direction.add(Directions.L);
  if (knotsDistance.eqY(2)) direction = direction.add(Directions.U);
  if (knotsDistance.eqY(-2)) direction = direction.add(Directions.D);

  return direction.eq(V(0, 0)) ? knotsDistance : direction;
};

export const part1 = () => {
  let head = V(0, 0);
  let tail = V(0, 0);
  const seen = [tail];

  cleanInput(`${__dirname}/input.txt`).forEach(({ direction, count }) =>
    range(1, count).forEach((_) => {
      head = head.add(direction);
      tail = head.add(knotDirection(tail, head));

      if (!seen.find((v) => v.eq(tail))) seen.push(tail);
    })
  );

  return seen.length;
};

export const part2 = () => {
  let head = V(0, 0);
  let knots = Array.from({ length: 9 }, (_) => V(0, 0));
  const seen = [knots[0]];

  cleanInput(`${__dirname}/input.txt`).forEach(({ direction, count }) =>
    range(1, count).forEach((_) => {
      head = head.add(direction);
      let prev = head;
      range(0, 8).forEach((kI) => {
        knots[kI] = prev.add(knotDirection(knots[kI], prev));
        prev = knots[kI];
      });

      if (!seen.find((v) => v.eq(tail(knots)))) seen.push(tail(knots));
    })
  );

  return seen.length;
};
