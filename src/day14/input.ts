import { chunk } from "@utils/array";
import { readlines } from "@utils/file";
import { ints } from "@utils/string";
import { V, Vector } from "@utils/vector";

export const cleanInput = (inputPath: string) =>
  readlines(inputPath)
    .map((l) => chunk(ints(l), 2))
    .flatMap((positions) => {
      const rocks: Vector[] = [];
      for (let index = 0; index < positions.length - 1; index++) {
        let left = V(positions[index][0], positions[index][1]);
        const right = V(positions[index + 1][0], positions[index + 1][1]);
        const diff = right.sub(left);

        while (1) {
          if (!rocks.find((r) => r.eq(left))) rocks.push(left);
          if (left.eq(right)) break;
          left = left.add(V(Math.sign(diff.x), Math.sign(diff.y)));
        }
      }

      return rocks;
    });
