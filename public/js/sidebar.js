let sidebarSketch = function (p) {
  let sidebar;

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
  };

  p.draw = function () {
    p.clear(); // Clear the canvas each frame
    let gridSize = 50;
    for (let x = 0; x < p.width; x += gridSize) {
      for (let y = 0; y < p.height; y += gridSize) {
        let distance = p.dist(
          p.mouseX - sidebar.offsetLeft,
          p.mouseY - sidebar.offsetTop,
          x,
          y
        );
        let offset = p.map(distance, 0, 200, 0, 25);
        p.ellipse(x + offset, y + offset, 5, 5);
      }
    }
  };

  p.windowResized = function () {
    p.resizeCanvas(sidebar.offsetWidth, document.body.scrollHeight); // Resize canvas based on full page height
  };
};

new p5(sidebarSketch);
