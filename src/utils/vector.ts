export class Vector {
  x: number;
  y: number;
  z?: number;
  constructor(x: number, y: number, z?: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  add(v: Vector) {
    return V(
      this.x + v.x,
      this.y + v.y,
      this.z !== undefined && v.z !== undefined ? this.z + v.z : undefined
    );
  }
  sub(v: Vector) {
    return V(
      this.x - v.x,
      this.y - v.y,
      this.z !== undefined && v.z !== undefined ? this.z - v.z : undefined
    );
  }
  eq(v: Vector) {
    return this.eqX(v.x) && this.eqY(v.y) && this.eqZ(v.z);
  }
  eqX(x: number) {
    return this.x === x;
  }
  eqY(y: number) {
    return this.y === y;
  }
  eqZ(z?: number) {
    return this.z === z;
  }
  toString() {
    return `${this.x}, ${this.y}` + (this.z ? `, ${this.z}` : "");
  }
}

export const V = (x: number, y: number, z?: number) => new Vector(x, y, z);
