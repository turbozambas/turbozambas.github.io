let title="Flower Power";
let date="Jan 2025";
let desc="generative random flowers";
$("title").text(`${title} by turbozambas`);
$("h2").text(`${title}`);
$("footer p").text(`${desc} - ${date}`);

let canvasSize = 800;
let bgColor = '#ffe6ae';
let circles = [];
let maxAttempts = 10000;
let buffer = 2;

function setup() {
	createCanvas(canvasSize, canvasSize);
	noLoop();
}

function draw() {
	background(bgColor);
	let maxCircles = 250;
	for (let i = 0; i < maxCircles; i++) {
		let attempts = 0;
		while (attempts < maxAttempts) {
			let newCircle = {
			x: random(width),
			y: random(height),
			r: random(10, 100)
			};
			if (isValid(newCircle)) {
				circles.push(newCircle);
				drawFlower(newCircle);
				break;
			}
		attempts++;
		}
	}
}

// Check if new circles are valid
function isValid(circle) {
	for (let other of circles) {
		let d = dist(circle.x, circle.y, other.x, other.y);
		if (d < circle.r + other.r + buffer) {
			return false;
		}
	}
	return true;
}

// Draw Flower
function drawFlower(circle) {
	let fpColors = ['#673b22','#6dd0b9','#fe9f01','#fe7400'];
	stroke(50);
	strokeWeight(1);
	let k = random(fpColors);
	const index = fpColors.indexOf(k);
	if (index > -1) { fpColors.splice(index,1); }
	fill(random(fpColors));
	for (var i=1; i <= 12; i++) {
		let r = circle.r*.19;
		let a = TWO_PI/12*i;
		let c = createVector(circle.x, circle.y).add(p5.Vector.fromAngle(a).mult(circle.r-r));
		let m = createVector(c.x, c.y).add(p5.Vector.fromAngle(a+HALF_PI).mult(r));
		let n = createVector(c.x, c.y).add(p5.Vector.fromAngle(a-HALF_PI).mult(r));
		strokeWeight(r/6);
		beginShape();
			vertex(circle.x, circle.y);
			vertex(n.x, n.y);
			let arcResolution = r;
			for (let j = 0; j <= arcResolution; j++) {
				let arcAngle = lerp(a - HALF_PI, a + HALF_PI, j / arcResolution);
				let arcX = c.x + cos(arcAngle) * r;
				let arcY = c.y + sin(arcAngle) * r;
				vertex(arcX, arcY);
			}
			vertex(m.x, m.y);
		endShape(CLOSE);
	}
	fill(k);
	ellipse(circle.x, circle.y, circle.r*2*.5);
}