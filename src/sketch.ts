import p5 from "p5";
import { Cell } from "../src/Cell";

const sketch = (p: p5) => {
  const grid: Cell[][] = [];
  const width = 16;
  const height = 9;
  const squareSize = Math.ceil(
    Math.max(screen.width / width, screen.height / height)
  );
  const stack: Cell[] = [];

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    p.disableFriendlyErrors = true; // disable friendly errors for increased performance

    canvas.position(0, 0); // make canvas start in top-left corner
    canvas.style("z-index", "-1"); // set canvas as background
    p.frameRate(2); // target framerate

    // initalise grid
    for (let i = 0; i < width; i++) {
      grid[i] = [];
      for (let j = 0; j < height; j++) {
        grid[i][j] = new Cell(squareSize, j, i);
      }
    }

    // draw initial state
    drawState();

    //inital node
    stack.push(grid[0][0]);
  };

  // redraw everything at the correct scale
  // TODO: Make this only happen after a short while, or implement a way to not lag browser
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    drawState();
  };

  p.draw = () => {
    if (stack.length > 0) {
      const current = stack.pop();

      const sides: boolean[] = [false, false, false, false]; // going from top clockwise, true indicates unvisited neighbour there

      // top
      if (current.j - 1 >= 0 && grid[current.i][current.j - 1].visited) {
        sides[0] = true;
      }
      // right
      if (current.i + 1 < width && grid[current.i + 1][current.j].visited) {
        sides[1] = true;
      }
      // bottom
      if (current.j + 1 < height && grid[current.i][current.j + 1].visited) {
        sides[2] = true;
      }
      // left
      if (current.i - 1 >= 0 && grid[current.i - 1][current.j].visited) {
        sides[3] = true;
      }

      if (sides[0] || sides[1] || sides[2] || sides[3]) {
        // push unvisited adjacent nodes, together with current again
        stack.push(current);

        const options: number[] = [];
        for (let i = 0; i < 4; i++) if (sides[i]) options.push(i);
        const chosen = options[Math.round(Math.random()*options.length)];
        for (let i = 0; i < 4; i++) if (chosen != i) sides[i] == false;

        if (sides[0]) {
          stack.push(grid[current.i][current.j - 1]);
          grid[current.i][current.j - 1].visited = true;
        }
        if (sides[1]) {
          stack.push(grid[current.i + 1][current.j]);
          grid[current.i + 1][current.j].visited = true;
        }
        if (sides[2]) {
          stack.push(grid[current.i][current.j + 1]);
          grid[current.i][current.j + 1].visited = true;
        }
        if (sides[3]) {
          stack.push(grid[current.i - 1][current.j]);
          grid[current.i - 1][current.j].visited = true;
        }
      }
    } else {
      // nothing left in stack, stop loop
      p.noLoop();
    }
    console.log(stack)
  };

  const drawState = () => {
    p.push();
    p.background(0, 0, 0);
    p.stroke(255, 255, 255);
    p.strokeWeight(squareSize / 3);
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        grid[i][j].draw(p);
      }
    }
    p.pop();
  };

  // set functions as global functions
  window.saveCanvas = () => p.saveCanvas("canvas", "png");
  window.windowResized = p.windowResized;
};

const sketchP = new p5(sketch);
