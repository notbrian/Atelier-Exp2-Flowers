// Atelier Exp 2 by Brian Nguyen

// Rules
// Points randomly placed across a square canvas
// All points should be connected to eachother using bezier curves
// Positions of the control points are randomly placed, every curve uses the same points

// Changable variables

// Number of points
const num = 15;
// Speed factor of tails movement
const speed = 0.5;
// Easing factor of transition animations
const easingFactor = 0.06;
// Interval of auto transition
const refreshInterval = 20000;

// Storage arrays
// Position of points
const points = [];
// Position of bezier control points
const controlPoints = [];
// Current color of lines
let color = [];

// Color to transition to
let newColor = [];
// Control points to transition to
let newCPoints = [];
// New points to transition to
const newPoints = [];

// Setup function runs once
function setup() {
  createCanvas(windowHeight, windowHeight);
  background(0);
  strokeWeight(1.25);
  controlPoints[0] = width / 2;
  controlPoints[1] = height / 2;
  controlPoints[2] = width / 2;
  controlPoints[3] = height / 2;
  newCPoints = [width, height, width, height];
  color = [random(100, 255), random(100, 255), random(100, 255), 100];
  newColor = color.slice();
  prevMouse = [mouseX, mouseY];


  for (let i = 0; i < num; i++) {
    const p = {
      xp: random(0, width),
      yp: random(0, height),
    };
    newPoints[i] = p;
  }

  for (let i = 0; i < num; i++) {
    const p = {
      xp: random(0, width),
      yp: random(0, height),
    };
    points[i] = p;
    console.log('loop 1');
  }

  setInterval(refresh, refreshInterval);
}


function draw() {
  background(0, 0, 0, 190);
  // background(0,0,0,255)


  fill(255, 160, 20, 255);
  for (let j = 0; j < points.length; j++) {
    points[j].xp = points[j].xp + random(-1, 1) * speed;
    points[j].yp = points[j].yp + random(-1, 1) * speed;




    if (points[j].xp > width) {
      points[j].xp = width;
    } else if (points[j].xp <= 0) {
      points[j].xp = 0;
    }

    if (points[j].yp <= 0) {
      points[j].yp = 0;
    } else if (points[j].yp > height) {
      points[j].yp = height;
    }

    stroke(color[0], color[1], color[2], color[3]);
    fill(color[0], color[1], color[2], 255);

    // old dots
    // ellipse(points[j].xp, points[j].yp, 12,12)
    fill(0, 0, 0, 0);


    for (let i = 0; i < points.length; i++) {
      stroke(color[0], color[1], color[2], color[3]);


      bezier(points[j].xp, points[j].yp, controlPoints[0], controlPoints[1], controlPoints[2], controlPoints[3], points[i].xp, points[i].yp);
    }
  }

  const dx = newCPoints[0] - controlPoints[0];
  controlPoints[0] += dx * easingFactor;
  const dy = newCPoints[1] - controlPoints[1];
  controlPoints[1] += dy * easingFactor;

  const fx = newCPoints[2] - controlPoints[2];
  controlPoints[2] += fx * easingFactor;
  const fy = newCPoints[3] - controlPoints[3];
  controlPoints[3] += fy * easingFactor;


  for (let i = 0; i < newPoints.length; i++) {
    const dx = newPoints[i].xp - points[i].xp;
    points[i].xp += dx * easingFactor;
    const dy = newPoints[i].yp - points[i].yp;
    points[i].yp += dy * easingFactor;
  }

  for (let i = 0; i < newColor.length; i++) {
    const dx = newColor[i] - color[i];
    color[i] += dx * 0.1;
  }




  // DEBUG POINTS

  //    for(let i = 0; i < newPoints.length; i++) {
  //     fill(0,0,255);
  //     ellipse(newPoints[i].xp, newPoints[i].yp, 10,10)
  //   }


  //   fill(255,0,0)
  //   ellipse(controlPoints[0], controlPoints[1], 50,50)
  //     ellipse(controlPoints[2], controlPoints[3], 50,50)
  //   fill(0,255,0)
  //     ellipse(newPoints[0], newPoints[1], 50,50)
  //       ellipse(newPoints[2], newPoints[3], 50,50)
}


function keyTyped() {
  if (key === ' ') {
    refresh();
  }
}

function refresh() {
  for (let i = 0; i < num; i++) {
    const p = {
      xp: random(0, width),
      yp: random(0, height),
    };
    newPoints[i] = p;
  }
  newColor = [random(100, 255), random(100, 255), random(100, 255), 100];


  newCPoints = [random(-50, width + 50), random(-50, height + 50), random(-50, width + 50), random(-50, height + 50)];
}