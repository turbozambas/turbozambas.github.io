let title="sunset";
let date="Dec 2024";
let desc ="static sunset";
$("title").text(`${title} by turbozambas`);
$("footer p").text(`${desc} - ${date}`);

let canvasSize = 600;
let offset = 20;
let startY = canvasSize/2.5;
let p = offset*(offset/10);
let arcCenterX = canvasSize/2;
let arcCenterY = startY/2;
let arcRadius = canvasSize/3;
let leftCircle = [];
let rightCircle = [];
let cuts = [];
let skyColor = [];
let sunColor = [];

function setup() {
	createCanvas(canvasSize, canvasSize);
    background('#0a0c37');
    noLoop();
    skyColor = [color('#f4ff61'),color('#ff9900')];
    sunColor = [color('#ff7b04'),color('#dc143c')];
}

function draw() {
	stroke('#ff61c6');
	strokeWeight(2);

	// draw horizontal grid lines
	for (var i=0; i <= 100; i++) {
		if (i != 1) line(0, startY + (offset*i) * (p*i)/1000, canvasSize, startY + (offset*i) * (p*i)/1000);
		if (startY + (offset*i) * (p*i)/1000 > canvasSize) break;
	}

	// draw vertical grid lines
	for (var i=0; i < canvasSize/offset/2; i++) {
		if (i == 0) {
			let o = offset/2;
			line(canvasSize/2 + (o*i), startY, canvasSize/2 + (o*i), canvasSize);
		}
		else {
			let o = offset;
			line(canvasSize/2 + (o*i), startY, canvasSize/2 + (o*i) + (p*i), canvasSize);
			line(canvasSize/2 - (o*i), startY, canvasSize/2 - (o*i) - (p*i), canvasSize);
		}
	}

	// draw the sky
	for (var i=0; i < startY; i++) {
		n = map(i,0,startY,0,1);
		let newc = lerpColor(skyColor[0],skyColor[1],n);
		stroke(newc);
		line(0,i,canvasSize,i);
	}

	// calc sun's shape
	strokeWeight(2);
	for (let angle = HALF_PI; angle <= PI+HALF_PI; angle += 0.01) {
		let x = arcCenterX + cos(angle) * arcRadius / 2;
		let y = arcCenterY + sin(angle) * arcRadius / 2;
		leftCircle.push([x,y]);
	}
	for (let angle = PI+HALF_PI; angle <= TWO_PI+HALF_PI; angle += 0.01) {
		let x = arcCenterX + cos(angle) * arcRadius / 2;
		let y = arcCenterY + sin(angle) * arcRadius / 2;
		rightCircle.push([x,y]);
	}
	leftCircle.reverse();

	let spacing = 11;
	for (var i=1; i <= 9; i++) cuts.push([Math.round((startY/2+spacing*i)-(i/2)),Math.round((startY/2+spacing*i)+(i/2))]);

	// calc sun's color
	for (var i = 0; i < leftCircle.length; i++) {
	    let shouldDrawLine = true;
		let n = map(i,0,canvasSize/4+canvasSize/6,0,1);
		let newc = lerpColor(sunColor[0],sunColor[1],n);
		stroke(newc);
		// check for cuts
	    for (let j = 0; j < cuts.length; j++) {
	        if (leftCircle[i][1] > cuts[j][0] && leftCircle[i][1] < cuts[j][1]) {
	            shouldDrawLine = false;
	            break;
	        }
	    }
	    // draw the sun
	    if (shouldDrawLine) line(leftCircle[i][0], leftCircle[i][1], rightCircle[i][0], rightCircle[i][1]);
	}
}