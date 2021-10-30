import p5 from "p5";
import { Cell } from "../src/Cell";

const sketch = (p: p5) => {
  const grid: Cell[][] = [];
  const width = 16;
  const height = 9;
  const squareSize = Math.ceil(
    Math.max(screen.width / width, screen.height / height)
  );
  console.log(squareSize);
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
  };

  // redraw everything at the correct scale
  // TODO: Make this only happen after a short while, or implement a way to not lag browser
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    drawState();
  };

  p.draw = () => {
    // p.background(0,200,200);
    // p.ellipse(100, 150, 180, 60);
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
