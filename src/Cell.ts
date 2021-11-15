import p5 from "p5";

type Cell_connectivity = {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
};

export class Cell {
  s: number; // size of sides of square on screen
  i: number; // i'th column
  j: number; // j'th row
  visited: boolean;

  // true indicated cell is connected to another cell on that side
  connected: Cell_connectivity = {
    top: false,
    right: false,
    bottom: false,
    left: false,
  };

  constructor(size: number, row: number, column: number) {
    this.s = size;
    this.i = column;
    this.j = row;
    this.visited = false;
  }

  draw(sketch: p5) {
    // sketch.push();
    // sketch.strokeWeight(2);
    // sketch.noFill();
    // // if (this.visited){
    // //   sketch.fill(255,100,50);
    // // }
    // sketch.rect(this.s * this.i, this.s * this.j, this.s, this.s);
    // sketch.pop();

    if (this.connected.top) {
      sketch.line(
        (this.i + 0.5) * this.s,
        (this.j + 0.5) * this.s,
        (this.i + 0.5) * this.s,
        (this.j - 0.5) * this.s
      );
    }
    if (this.connected.left) {
      sketch.line(
        (this.i + 0.5) * this.s,
        (this.j + 0.5) * this.s,
        (this.i - 0.5) * this.s,
        (this.j + 0.5) * this.s
      );
    }
    if (this.connected.bottom) {
      sketch.line(
        (this.i + 0.5) * this.s,
        (this.j + 0.5) * this.s,
        (this.i + 0.5) * this.s,
        (this.j + 1.5) * this.s
      );
    }
    if (this.connected.right) {
      sketch.line(
        (this.i + 0.5) * this.s,
        (this.j + 0.5) * this.s,
        (this.i + 1.5) * this.s,
        (this.j + 0.5) * this.s
      );
    }
  }
}
