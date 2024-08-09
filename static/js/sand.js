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
  // Create the canvas
  let canvas = createCanvas(500, 200);

  // Attach the canvas to the HTML element with the ID 'sketch-container'
  canvas.parent("sketch-container");

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

function addSand() {
  let x = floor(emissionX / cellSize);
  let y = floor(emissionY / cellSize);
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    grid[x][y] = {
      color: random(colors),
      speed: random(0.2, 1),
    };
  }
}

function updateSand() {
  for (let x = 0; x < cols; x++) {
    for (let y = rows - 1; y >= 0; y--) {
      if (grid[x][y]) {
        if (random() < grid[x][y].speed) {
          if (y < rows - 1 && !grid[x][y + 1]) {
            grid[x][y + 1] = grid[x][y];
            grid[x][y] = undefined;
          } else {
            let direction = random([-1, 1]);
            if (
              x + direction >= 0 &&
              x + direction < cols &&
              y < rows - 1 &&
              !grid[x + direction][y + 1]
            ) {
              grid[x + direction][y + 1] = grid[x][y];
              grid[x][y] = undefined;
            }
          }
        }
      }
    }
  }
}

function drawSand() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (grid[x][y]) {
        fill(grid[x][y].color);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

function create2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function changeDirection() {
  emissionDirection *= -1;
  setNextDirectionChange();
}

function setNextDirectionChange() {
  nextDirectionChange = frameCount + floor(random(60, 300)); // Change direction every 1-5 seconds
}
