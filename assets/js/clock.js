let title="clock";
let date="Nov 2026";
let desc="ticking away the moments that make up a dull day";
$("title").text(`${title} by turbozambas`);
$("footer p").text(`${desc} - ${date}`);

let canvasSize=600;
let color=["#EDE7F6","#263746","#D97757","#E8C547"];
let angle=0;

const pause = {
	paused: false,
	pauseStart:0,
	pauseDuration:1000
}

const clock = {
	origin: [canvasSize/2,canvasSize/2],
	pointers: {
		seconds: [0,0],
		minutes: [0,0],
		hours: [0,0]
	}
}

function setup() {
	createCanvas(canvasSize, canvasSize);
	//noLoop();
}

function wait() {
	if (pause.paused) {
		if (millis() - pause.pauseStart >= pause.pauseDuration) pause.paused = false;
		else return;
	}
	angle += 6;
	pause.paused = true;
	pause.pauseStart = millis();
}

function getPoint(x, y, distance, angle) {
	let position = [x + distance * Math.cos(radians(angle)), y + distance * Math.sin(radians(angle))];
	return position;
}

function drawClock() {
	noStroke();
	fill(color[1]);
	circle(clock.origin[0],clock.origin[1],canvasSize*.786);
	stroke(color[0]);
	let s=moment().format('ss');
	let m=moment().format('mm');
	let h=moment().format('hh');
	clock.pointers.seconds=getPoint(clock.origin[0],clock.origin[1],canvasSize/3, Number(s)*360/60-90);
	clock.pointers.minutes=getPoint(clock.origin[0],clock.origin[1],canvasSize/3*.786, Number(m)*360/60-90);
	clock.pointers.hours=getPoint(clock.origin[0],clock.origin[1],canvasSize/5*.786, Number(h)*360/12-90);
	stroke(color[2]);
	strokeWeight(2);
	line(clock.origin[0],clock.origin[1],clock.pointers.seconds[0],clock.pointers.seconds[1]);
	strokeWeight(6);
	line(clock.origin[0],clock.origin[1],clock.pointers.minutes[0],clock.pointers.minutes[1]);
	strokeWeight(10);
	line(clock.origin[0],clock.origin[1],clock.pointers.hours[0],clock.pointers.hours[1]);
	noStroke();
	fill(color[3]);
	circle(clock.origin[0],clock.origin[1],10);
}

function draw() {
	background(color[0]);
	drawClock();
	wait();
	if (angle > 360) angle -= 360;
}