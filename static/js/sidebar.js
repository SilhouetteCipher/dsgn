let sidebarSketch = function (p) {
  let sidebar;
  let dots = [];
  let gridSize = 20;
  let dotSize = 2;

  p.setup = function () {
    // Get the sidebar element by ID
    sidebar = document.getElementById("sidebar");

    // Create the canvas and place it within the sidebar
    let canvas = p.createCanvas(
      sidebar.offsetWidth,
      document.body.scrollHeight
    ); // Use scrollHeight to cover the entire page
    canvas.parent(sidebar);
    canvas.style("position", "absolute");
    canvas.style("top", "0");
    canvas.style("left", "0");
    canvas.style("z-index", "-1"); // Places the canvas behind the sidebar content
    p.noStroke();

    // Initialize the grid of dots
    for (let x = 0; x < p.width; x += gridSize) {
      for (let y = 0; y < p.height; y += gridSize) {
        dots.push({ x: x, y: y, originalX: x, originalY: y });
      }
    }
  };

  p.draw = function () {
    p.clear(); // Clear the canvas each frame
    p.fill(210); // Set fill color to black

    dots.forEach((dot) => {
      // Calculate distance from the cursor to the dot
      let distance = p.dist(p.mouseX, p.mouseY, dot.x, dot.y);

      // If cursor is within a certain range, move the dot away from the cursor
      if (distance < 100) {
        let angle = p.atan2(dot.y - p.mouseY, dot.x - p.mouseX);
        let moveDistance = p.map(distance, 0, 125, 25, 0);
        dot.x = dot.originalX + p.cos(angle) * moveDistance;
        dot.y = dot.originalY + p.sin(angle) * moveDistance;
      } else {
        // Gradually return the dot to its original position
        dot.x = p.lerp(dot.x, dot.originalX, 0.1);
        dot.y = p.lerp(dot.y, dot.originalY, 0.1);
      }

      // Draw the dot
      p.ellipse(dot.x, dot.y, dotSize, dotSize);
    });
  };

  p.windowResized = function () {
    p.resizeCanvas(sidebar.offsetWidth, document.body.scrollHeight); // Resize canvas based on full page height
  };
};

new p5(sidebarSketch);
