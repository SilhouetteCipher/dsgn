let palettes = [
  ["#35524a", "#627c85", "#779cab", "#a2e8dd", "#32de8a"],
  ["#ff5733", "#ffbd69", "#ffc87a", "#ffd8be", "#ffe6e1"],
  ["#ff5733", "#ffb133", "#ffda69", "#ffe87a", "#ffe6e1"],
];
let chosenPalette;
let planet,
  moons = [],
  stars = [];
let planetSize = 600;
let numMoons = 5;
let numStars = 1200;
let starBuffer;

function setup() {
  let canvas = createCanvas(600, 800);
  canvas.parent("sketch-container");
  chosenPalette = random(palettes);
  noStroke();

  // Create an off-screen graphics buffer for the stars
  starBuffer = createGraphics(width, height);

  // Initialize stars with positions
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      color: random(chosenPalette),
      vx: random(-0.05, 0.05), // Very slow velocity
      vy: random(-0.05, 0.05),
    });
  }

  // Initialize planet with random starting position
  planet = {
    x: random(-planetSize, width),
    y: random(height),
    targetX: width / 3,
    color: random(chosenPalette),
  };

  for (let i = 0; i < numMoons; i++) {
    moons.push({
      x: random(-100, -50),
      y: random(height),
      size: random(20, 40),
      color: random(chosenPalette),
      targetX: random(width / 2 - 100, width / 2 + 100),
      targetY: random(height / 2 - 100, height / 2 + 100),
      vx: random(1, 5), // Horizontal velocity
      vy: 0, // No vertical velocity
    });
  }
}

function draw() {
  // Draw stars on the buffer and wrap them around the canvas
  starBuffer.clear(); // Clear the star buffer to avoid overlapping trails
  for (let star of stars) {
    star.x += star.vx;
    star.y += star.vy;

    // Wrap stars around the canvas
    if (star.x > width) star.x = 0;
    if (star.x < 0) star.x = width;
    if (star.y > height) star.y = 0;
    if (star.y < 0) star.y = height;

    starBuffer.fill(star.color);
    starBuffer.ellipse(star.x, star.y, star.size, star.size);
  }

  // Clear the main canvas
  background(0);

  // Draw the star buffer on the main canvas
  image(starBuffer, 0, 0);

  // Draw planet and moons (which will not leave trails)
  planet.x += (planet.targetX - planet.x) * 0.05;
  drawPlanet();

  for (let moon of moons) {
    moon.x += moon.vx;
    moon.x += (moon.targetX - moon.x) * 0.05;
    moon.y += (moon.targetY - moon.y) * 0.05;
    moon.x += moon.vx;
    moon.y += moon.vy;
    drawMoon(moon);
  }
}

function drawPlanet() {
  fill(planet.color);
  ellipse(planet.x, planet.y, planetSize, planetSize);
}

function drawMoon(moon) {
  fill(moon.color);
  ellipse(moon.x, moon.y, moon.size, moon.size);
}
