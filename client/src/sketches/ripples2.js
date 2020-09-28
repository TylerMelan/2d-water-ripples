let cols;
let rows;
let current; // = new float[cols][rows];
let previous; // = new float[cols][rows];

let dampening = 0.99;

let scale = 25;

const ripples = (s) => {
  s.setup = () => {
    // s.pixelDensity(1);
    s.createCanvas(s.windowWidth, s.windowHeight);
    cols = Math.floor(s.width / scale);
    rows = Math.floor(s.height / scale);

    current = new Array(cols).fill(0).map((n) => new Array(rows).fill(0));
    previous = new Array(cols).fill(0).map((n) => new Array(rows).fill(0));

    s.noLoop();
  };

  s.keyPressed = () => {
    s.loop()
  }

  s.mouseClicked = () => {
    const mouseX = Math.floor(s.mouseX / scale);
    const mouseY = Math.floor(s.mouseY / scale);
    previous[mouseX][mouseY] = 500;
    // s.strokeWeight(4);
    // s.stroke(500);
    // s.circle(mouseX, mouseY, 50)
  };

  s.draw = () => {
    let t0 = performance.now();

    s.background(0);

    // let d = s.pixelDensity();

    // s.loadPixels();

    for (let i = 1; i < cols - 1; i++) {
      for (let j = 1; j < rows - 1; j++) {
        current[i][j] =
          (previous[i - 1][j] +
            previous[i + 1][j] +
            previous[i][j - 1] +
            previous[i][j + 1]) /
            2 -
          current[i][j];
        current[i][j] = current[i][j] * dampening;
        // Unlike in Processing, the pixels array in p5.js has 4 entries
        // for each pixel, so we have to multiply the index by 4 and then
        // set the entries for each color component separately.
        // let index = (i + j * cols);
        // s.pixels[index + 0] = current[i][j];
        // s.pixels[index + 1] = current[i][j];
        // s.pixels[index + 2] = current[i][j];
        // if (current[i][j] > 10) {
          s.fill(current[i][j]);
          s.rect(i * scale, j * scale, scale, scale);
          s.fill(255, 0, 0)
          s.textAlign(s.CENTER)
          s.text(s.floor(current[i][j]), i * scale + scale/2, j * scale + scale/2);
        // }
      }
    }

    // // s.updatePixels();

    let temp = previous;
    previous = current;
    current = temp;

    let t1 = performance.now();

    console.log("Took " + (t1 - t0) + " milliseconds.");

    console.log("Frame rate is " + s.getFrameRate());

    s.noLoop();
  };
};

export default ripples;
