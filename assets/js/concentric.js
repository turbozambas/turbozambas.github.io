let title="concentric";
let date="Dec 2024";
let desc="generative random concentric circles";
$("title").text(`${title} by turbozambas`);
$("footer p").text(`${desc} - ${date}`);

let circles=[];
let maxAttempts=2000;
let buffer=10;
let canvasSize=600;

function setup() {
	createCanvas(canvasSize, canvasSize);
	noLoop();
}

function draw() {
	background(random(230,255));
	let maxCircles=200;
	for (let i=0;i<maxCircles;i++) {
		let attempts=0;
		while (attempts<maxAttempts) {
			let newCircle = {
				x: random(width),
				y: random(height),
				r: random(25, 100)
				};
				if (isValid(newCircle)) {
				circles.push(newCircle);
				drawCircles(newCircle);
				break;
			}
			attempts++;
		}
	}
}

// Check if new circles are valid
function isValid(circle) {
	for (let other of circles) {
		let d=dist(circle.x, circle.y, other.x, other.y);
		if (d<circle.r+other.r+buffer) return false;
	}
	return true;
}

// Draw circles
function drawCircles(circle) {
	stroke(random(0, 40));
	strokeWeight(circle.r/20);
	noFill();
	for (var i=1;i<=10;i++) ellipse(circle.x, circle.y, circle.r*2*(i/10));
}