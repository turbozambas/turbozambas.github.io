let title="jazz";
let date="Oct 2024";
let desc="in homage to Queen";
$("title").text(`${title} by turbozambas`);
$("footer p").text(`${desc} - ${date}`);

let canvasSize=600;

function setup() {
	createCanvas(canvasSize, canvasSize);
	background(0);

	// First layer: Circles
	let radius=140;
	let spacing=10.6;
	let spacingReductionFactor=0.93;
	let strokeWeightStart=0.2;
	let strokeWeightIncrement=0.04;

	while (radius<273) {
		strokeWeight(strokeWeightStart);
		stroke(255);
		noFill();
		circle(canvasSize/2, canvasSize/2, 2*radius);
		radius+=spacing;
		spacing*=spacingReductionFactor;
		strokeWeightStart+=strokeWeightIncrement;
	}

	// Second layer: Ellipses
	let ellipseRadiusX=148;
	let ellipseRadiusY=110;
	let ellipseSpacing=10;
	let ellipseStrokeWeight=4;
	let ellipseCount=0;

	while (ellipseCount<10) {
		stroke(255);
		strokeWeight(ellipseStrokeWeight);
		noFill();
		ellipse(canvasSize/2, (canvasSize/2)-ellipseCount*2.5, 2*ellipseRadiusX, 2*ellipseRadiusY);
		ellipseRadiusX-=ellipseSpacing*0.96;
		ellipseRadiusY-=ellipseSpacing*0.73;
		ellipseSpacing*=1.08;
		ellipseCount++;
		ellipseStrokeWeight*=1.07;
	}

	// Outer circle
	strokeWeight(3);
	stroke(255);
	noFill();
	circle(canvasSize/2, canvasSize/2, 550);

	// "ZAMBAS"
	textFont('DejaVu Sans Mono');
	textStyle(ITALIC);
	push();
	let textColor="#d60466";
	let word="ZAMBAS";
	let x=(width/2)-70; 
	let y=(height/2)+30;
	rotate(-15*PI/180);
	fontSize=34;
	textAlign(CENTER, CENTER);
	fill(textColor);
	stroke(textColor);
	strokeWeight(2);
	for (let i=0;i<word.length;i++) {
		textSize(fontSize);
		text(word.charAt(i), x, y);
		x+=textWidth(word.charAt(i));
		y-=2;
		fontSize+=4;
	}
	pop();

	// "TURBO"
	let turboSpacing=50;
	let turboX=(width/2)-turboSpacing+12;
	let topTurboY=18;
	let bottomTurboY=600-4;
	let turboFontSize=20; 
	let totalTurboWidth=0;
	fill(255);
	stroke(255);
	strokeWeight(1);
	// Calculate total width of all "TURBO" instances
	for (let i=0;i<5;i++) totalTurboWidth+=textWidth("TURBO")+turboSpacing;
	// Calculate starting x-coordinate
	turboX-=totalTurboWidth/2;
	for (let i=0;i<5;i++) {
		textSize(turboFontSize);
		text("TURBO", turboX, topTurboY);
		text("TURBO", turboX, bottomTurboY);
		turboX+=textWidth("TURBO")+turboSpacing;
	}
}