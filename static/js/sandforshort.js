// Assuming canvasWidth and canvasHeight are defined globally

let grid;
let cols;
let rows;
let cellSize = 5;
let colors;
let emissionX = 0;
let emissionY;
let emissionSpeed = 1;
let emissionDirection = 1; // 1 for right, -1 for left
let nextDirectionChange;

function setup() {
  let wrapper = document.getElementById("sketch-wrapper-1") || document.body;
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(wrapper);

  // Initialize grid, colors, and other variables
  cols = width / cellSize;
  rows = height / cellSize;
  grid = create2DArray(cols, rows);

  colors = [
    color(255, 204, 0), // Yellow
    color(255, 102, 0), // Orange
    color(255, 0, 0), // Red
    color(153, 0, 204), // Purple
    color(0, 128, 255), // Blue
  ];

  emissionY = height - cellSize;
  noStroke();
  setNextDirectionChange();
}

function windowResized() {
  resizeCanvas(canvasWidth, canvasHeight); // Resizes based on the defined width and height
  cols = width / cellSize;
  rows = height / cellSize;
  grid = create2DArray(cols, rows);
}

function draw() {
  background(0);

  // Add new sand particles
  addSand();

  // Update and draw sand
  for (let i = 0; i < 3; i++) {
    updateSand();
  }
  drawSand();

  // Move emission point
  emissionX += emissionSpeed * emissionDirection;

  // Check if it's time to change direction
  if (frameCount >= nextDirectionChange) {
    changeDirection();
  }

  // Wrap around horizontally
  if (emissionX > width) emissionX = 0;
  if (emissionX < 0) emissionX = width;

  // Move up slowly
  emissionY -= 0.05;
  if (emissionY < 0) {
    emissionY = height - cellSize;
  }
}
