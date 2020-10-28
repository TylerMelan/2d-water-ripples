let cols;
let rows;
let current; // = new float[cols][rows];
let previous; // = new float[cols][rows];

const dampening = 0.99;
const cutOff = 10;

const radius = 50;

const startingColor = 100;

const ripples = (s) => {
  const circlePoints = (a, b) => {
    s.angleMode(s.DEGREES);

    for (let angle = 0; angle < 360; angle++) {
      let x = s.floor(radius * s.cos(angle) + a);
      let y = s.floor(radius * s.sin(angle) + b);
      previous[x][y] = startingColor;
    }
  };

  s.setup = () => {
    s.pixelDensity(1);
    s.createCanvas(s.windowWidth, s.windowHeight);
    cols = s.width;
    rows = s.height;

    current = new Array(cols).fill(0).map((n) => new Array(rows).fill(0));
    previous = new Array(cols).fill(0).map((n) => new Array(rows).fill(0));
  };

  s.mouseDragged = () => {
    // const mouseX = Math.floor(s.mouseX);
    // const mouseY = Math.floor(s.mouseY);
    // previous[mouseX][mouseY] = 500;
    circlePoints(s.mouseX, s.mouseY);
    // s.strokeWeight(4);
    // s.stroke(500);
    // s.circle(mouseX, mouseY, 50)
  };

  s.draw = () => {
    s.background(0);

    s.loadPixels();
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
        if (current[i][j] > cutOff) {
          let index = (i + j * cols) * 4;
          s.pixels[index + 0] = current[i][j];
          s.pixels[index + 1] = current[i][j];
          s.pixels[index + 2] = current[i][j];
        }
      }
    }
    s.updatePixels();

    let temp = previous;
    previous = current;
    current = temp;

    // console.log("Frame rate is " + s.getFrameRate())
  };
};

export default ripples;
