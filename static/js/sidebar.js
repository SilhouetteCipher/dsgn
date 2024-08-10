function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1"); // Places the canvas behind your HTML elements
  canvas.style("position", "fixed");
  noStroke();
}

function draw() {
  background(0);
  let gridSize = 50;
  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      let distance = dist(mouseX, mouseY, x, y);
      let offset = map(distance, 0, 200, 0, 25);
      ellipse(x + offset, y + offset, 5, 5);
    }
  }
}
