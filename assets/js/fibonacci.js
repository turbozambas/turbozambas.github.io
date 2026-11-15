let title="fibonacci";
let date="Nov 2026";
let desc ="fibonacci";
$("title").text(`${title} by turbozambas`);
$("footer p").text(`${desc} - ${date}`);

let canvasSize = 600;
let drawingSize = canvasSize*.618;
let drawingBorder = (canvasSize - drawingSize) / 2;
let drawingHypothenuse = Math.sqrt(drawingSize * drawingSize * 2);
let controlPoints = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
let angle;
let paused = false;
let pauseStart = 0;
let pauseDuration = 2000;
let squares = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
let black = "#000";

function setup() {
	createCanvas(canvasSize, canvasSize);
	angle = 0; // set starting hypotenuse angle
}

function fibonacci(n) { // Fib Sequence F(n)=F(n-1)+F(n-2))
	let sequence = [0, 1]; // sequence starting point
	for (let i = 2; i <= n; i++) sequence[i] = sequence[i - 1] + sequence[i - 2];
	return sequence;
}
function getPoint(x, y, distance, angle) {
	let position = [x + distance * Math.cos(radians(angle)), y + distance * Math.sin(radians(angle))];
	return position;
}

function drawSquares(f) {
	let total = f.reduce((sum, n) => sum + n, 0);
	let scaleFactorSize = drawingSize / total;
	let scaledSize = f.map(n => n * scaleFactorSize);
	squares = [];
	for (let i = 0; i < 8; i++) {
		let a = 0;
		let p1 = controlPoints[i];
		let p2 = getPoint(controlPoints[i][0], controlPoints[i][1], scaledSize[i], a + angle * i);
		let p3 = controlPoints[i + 1];
		let p4 = getPoint(controlPoints[i][0], controlPoints[i][1], scaledSize[i], a +angle * i+90);
		squares.push([[p1[0], p2[0], p3[0], p4[0]], [p1[1], p2[1], p3[1], p4[1]]]);
		drawSquare(squares[i][0], squares[i][1],i);
	}
}
function drawSquare(x, y, i) {
	let colors=["#A94F38","#34746D","#526F91","#788044","#805477","#B87538","#45634B","#55504A"];
	strokeWeight(1);
	fill(colors[i]);
	quad(x[0], y[0], x[1], y[1], x[2], y[2], x[3], y[3]);
}

function calcControlPoints(f) {
	// scale hypothnuses
	let total = f.reduce((sum, n) => sum + n, 0);
	let scaleFactorHypothenuse = drawingHypothenuse / total;
	let scaledHypothnuses = f.map(n => n * scaleFactorHypothenuse);

	controlPoints = Array.from({ length: 9 }, () => [drawingBorder, drawingBorder]);
	for (let i = 0; i <= 8; i++) { // calculate controls points' coordinates
		let a = 45;
		if (i > 0) controlPoints[i + 1] = getPoint(controlPoints[i][0], controlPoints[i][1], scaledHypothnuses[i], a + angle * i);
		else controlPoints[i + 1] = getPoint(controlPoints[i][0], controlPoints[i][1], scaledHypothnuses[i], a);
	}
	controlPoints.pop();
}

function draw() {
	let bgColor = '#E8D9B5';
	background(bgColor);
	let fib = fibonacci(8).reverse(); // calculate fib sequence
	calcControlPoints(fib);
	drawSquares(fib);
	if (paused) {
		if (millis() - pauseStart >= pauseDuration) paused = false;
		else return;
	}
	angle += .75; // speed
	if (angle % 90 === 0) {
		paused = true;
		pauseStart = millis();
	}
	if (angle > 360) angle -= 360;
}