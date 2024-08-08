let x = 0;
let y = 200;
let xSpeed = 2;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("sketch-container");
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
