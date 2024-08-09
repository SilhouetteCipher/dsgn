let x = 0;
let y = 200;
let xSpeed = 2;

function setup() {
  let wrapper = document.getElementById("sketch-wrapper-1"); // Match the ID from the shortcode
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(wrapper); // Attach the canvas to the specific wrapper
}

function windowResized() {
  resizeCanvas(canvasWidth, canvasHeight); // Resizes based on the defined width and height
}

function draw() {
  background(220);
  fill(0);
  ellipse(x, y, 50, 50);
  x += xSpeed;

  if (x > width || x < 0) {
    xSpeed *= -1;
  }
}
