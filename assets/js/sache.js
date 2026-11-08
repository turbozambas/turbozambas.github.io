let title="sache";
let date="Feb 2025";
$("title").text(`${title} by turbozambas`);
$("h2").append(`${title} (${date})`);

let canvasSize = 800;
let gridSize = 8;
let squareSize = canvasSize/gridSize;
let colors = ['#4CAF50', '#F4C430', '#7E57C2'];


function setup() {
    createCanvas(canvasSize,canvasSize);
	background(255);
	noLoop();
}

function drawQuarterShape(cx1, cy1, r1, startAngle1, endAngle1, cx2, cy2, r2, startAngle2, endAngle2) {
	beginShape();
		for (let a = startAngle1; a <= endAngle1; a += 0.01) {
			vertex(cx1 + r1 * cos(a), cy1 + r1 * sin(a));
		}
		for (let a = startAngle2; a <= endAngle2; a += 0.01) {
			vertex(cx2 + r2 * cos(a), cy2 + r2 * sin(a));
		}
	endShape(CLOSE);
}

function shapes(i, j) {
	let r1 = (squareSize - squareSize * 0.04) / 2;
	let r2 = (squareSize * 0.3) / 2;

	// top left
	drawQuarterShape(
		squareSize * (j - 1) + squareSize * 0.01, squareSize * (i - 1) + squareSize * 0.01, r1, 
		0, HALF_PI, 
		squareSize * (j - 1) + squareSize * 0.16, squareSize * (i - 1) + squareSize * 0.16, r2, 
		PI, PI + HALF_PI
	);

	// top right
	drawQuarterShape(
		squareSize * j - squareSize * 0.01, squareSize * (i - 1) + squareSize * 0.01, r1, 
		HALF_PI, PI, 
		squareSize * j - squareSize * 0.16, squareSize * (i - 1) + squareSize * 0.16, r2, 
		PI + HALF_PI, TWO_PI
	);

	// bottom right
	drawQuarterShape(
		squareSize * j - squareSize * 0.01, squareSize * i - squareSize * 0.01, r1, 
		PI, PI + HALF_PI, 
		squareSize * j - squareSize * 0.16, squareSize * i - squareSize * 0.16, r2, 
		0, HALF_PI
	);

	// bottom left
	drawQuarterShape(
		squareSize * (j - 1) + squareSize * 0.01, squareSize * i - squareSize * 0.01, r1, 
		PI + HALF_PI, TWO_PI, 
		squareSize * (j - 1) + squareSize * 0.16, squareSize * i - squareSize * 0.16, r2, 
		HALF_PI, PI
	);
}


function draw() {
	let n = 0; // picks the color
	for (var i = 1; i <= gridSize; i++) {
		for (var j = 1; j <= gridSize; j++) {
			if (n > 2) { n = 0; }
			fill(255);
			noStroke();
			fill(colors[n]);
			shapes(i,j);
			n++;
		}
	}
}