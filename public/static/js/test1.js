let particles = [];
let flowfield;
let scale = 20;
let palettes = [
  ["#35524a", "#627c85", "#779cab", "#a2e8dd", "#32de8a"],
  ["#ff5733", "#ffbd69", "#ffc87a", "#ffd8be", "#ffe6e1"],
  ["#ff5733", "#ffb133", "#ffda69", "#ffe87a", "#ffe6e1"],
];
let startTime; // Variable to track start time

function setup() {
  createCanvas(600, 800);
  background(255);
  startTime = millis(); // Set the start time

  // Initialize flowfield
  flowfield = new Array(floor(width / scale) * floor(height / scale));
  let yoff = 0;
  for (let y = 0; y < height; y += scale) {
    let xoff = 0;
    for (let x = 0; x < width; x += scale) {
      let index = floor(x / scale) + floor(y / scale) * floor(width / scale);
      let angle = noise(xoff, yoff) * TWO_PI;
      let v = p5.Vector.fromAngle(angle).setMag(0.1);
      flowfield[index] = v;
      xoff += 0.1;
    }
    yoff += 0.1;
  }

  // Create particles
  for (let i = 0; i < 50; i++) {
    let palette = random(palettes);
    particles.push(new Particle(random(width), height + 50, palette));
  }
}

function draw() {
  let elapsedTime = millis() - startTime;
  let slowDownStart = 15000; // Start slowing down after 15000 ms (15 seconds)
  let slowDownDuration = 5000; // Duration of slowing down is 5000 ms (5 seconds)

  for (let particle of particles) {
    particle.follow(flowfield);
    particle.update();

    // Check if it's time to start slowing down
    if (elapsedTime > slowDownStart) {
      let slowDownFactor = map(
        elapsedTime,
        slowDownStart,
        slowDownStart + slowDownDuration,
        1,
        0
      );
      slowDownFactor = max(slowDownFactor, 0); // Ensure it doesn't go below 0
      particle.slowDown(slowDownFactor);
    }

    particle.show();
  }
}

class Particle {
  constructor(x, y, colors) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, -2); // Initial upward velocity
    this.acc = createVector(0, 0);
    this.color = random(colors); // Assign a random color from the palette
  }

  follow(vectors) {
    let x = floor(this.pos.x / scale);
    let y = floor(this.pos.y / scale);
    let index = x + y * floor(width / scale);
    let force = vectors[index];
    if (force) {
      this.applyForce(p5.Vector.mult(force, 0.4));
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.limit(4);
    this.acc.mult(0);

    // Wrap around the canvas
    if (this.pos.y < 0) {
      this.pos.y = height;
    }
    if (this.pos.x > width) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = width;
    }
  }

  slowDown(factor) {
    this.vel.mult(factor); // Multiply velocity by the slowdown factor
  }

  show() {
    fill(this.color);
    noStroke();
    circle(this.pos.x, this.pos.y, 30); // Visible size
  }
}
