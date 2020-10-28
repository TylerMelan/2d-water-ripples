let circles = [];

let dampening = 0.95;

const fun = (s) => {
  s.setup = () => {
    s.createCanvas(s.windowWidth, s.windowHeight);
  };

  s.mouseDragged = () => {
    const mouseX = Math.floor(s.mouseX);
    const mouseY = Math.floor(s.mouseY);
    circles.push([mouseX, mouseY, 150, 20]);
  };

  s.draw = () => {

    s.background(0);
    circles.forEach((circle, index) => {
      s.fill(circle[3])
      s.circle(circle[0], circle[1], circle[2])
      circle[2] += 1
      circle[3] *= dampening
      if (circle[3] < 0.5) {
        circles.splice(index, 1)
      }
    })
  };
};

export default fun;
