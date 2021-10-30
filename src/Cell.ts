import p5 from "p5";

type Cell_connectivity = {
  top: boolean;
  left: boolean;
  bottom: boolean;
  right: boolean;
};

export class Cell {
  s: number; // size of sides of square on screen
  i: number; // i'th column
  j: number; // j'th row
  visited: boolean;

  // true indicated cell is connected to another cell on that side
  connected: Cell_connectivity = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  constructor(size: number, row: number, column: number) {
    this.s = size;
    this.i = column;
    this.j = row;
    this.visited = false;

    if (Math.random() > 0.9){
      this.connected.top = true;
      this.connected.bottom = true;
      this.connected.left = true;
      this.connected.right = true;
    }
  }

  draw(sketch: p5) {
    sketch.push();
    sketch.strokeWeight(2);
    sketch.noFill();
    sketch.rect(this.s * this.i, this.s * this.j, this.s * (this.i + 1), this.s * (this.j + 1));
    sketch.pop();

    if (this.connected.top) {
      sketch.line((this.i + 0.5) * this.s, (this.j + 0.5) * this.s, (this.i + 0.5) * this.s, (this.j - 0.5) * this.s);
    }
    if (this.connected.left) {
      sketch.line((this.i + 0.5) * this.s, (this.j + 0.5) * this.s, (this.i - 0.5) * this.s, (this.j + 0.5) * this.s);
    }
    if (this.connected.bottom) {
      sketch.line((this.i + 0.5) * this.s, (this.j + 0.5) * this.s, (this.i + 0.5) * this.s, (this.j + 1.5) * this.s);
    }
    if (this.connected.right) {
      sketch.line((this.i + 0.5) * this.s, (this.j + 0.5) * this.s, (this.i + 1.5) * this.s, (this.j + 0.5) * this.s);
    }
    
  }
}
