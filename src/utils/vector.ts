export class Vector {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  add(v: Vector) {
    return V(this.x + v.x, this.y + v.y);
  }
  sub(v: Vector) {
    return V(this.x - v.x, this.y - v.y);
  }
  eq(v: Vector) {
    return this.eqX(v.x) && this.eqY(v.y);
  }
  eqX(x: number) {
    return this.x === x;
  }
  eqY(y: number) {
    return this.y === y;
  }
  toString() {
    return `${this.x}, ${this.y}`;
  }
}

export const V = (x: number, y: number) => new Vector(x, y);
