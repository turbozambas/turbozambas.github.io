let title="mENGERsPONGE";
let date="Aug 2025";
let desc="menger sponge fractal";
$("title").text(`${title} by turbozambas`);
$("h2").text(`${title}`);
$("footer p").text(`${desc} - ${date}`);

let angle=0;
let sponge=[];
let backgroundColor="#306985";
let colors=["#d0c280","#629036"];
let canvasSide=600;

function randomColor() {
	let c=colors[Math.floor(Math.random()*colors.length)]
	console.log(c);
	return c;
}

function setup() {
	// canvas setup
	createCanvas(canvasSide,canvasSide,WEBGL);
	noStroke();
	fill(randomColor());
	// prepare sponge
	let b=new Box(0,0,0,340);
	sponge.push(b);
	// generate 3 recursion levels
	for (let i=0;i<3;i++) {
		let next=[];
		for (let b of sponge) next=next.concat(b.generate());
		sponge=next;
	}
}

function draw() {
	background(backgroundColor);
	// controls rotation pitch
	rotateX(angle*0.5);
	rotateY(angle*0.2);
	lights();
	ambientLight(backgroundColor);
	for (let b of sponge) b.show();
	// controls rotation speed
	angle+=0.02;
}

class Box {
	constructor(x,y,z,size) {
		this.pos=createVector(x,y,z);
		this.size=size;
	}

	generate() {
		let boxes=[];
		let newSize=this.size / 3;
		for (let x=-1;x<2;x++) {
			for (let y=-1;y<2;y++) {
				for (let z=-1;z<2;z++) {
					let sum=abs(x)+abs(y)+abs(z);
					// skip cubes in the middle
					if (sum>1) {
						let b=new Box(
							this.pos.x+x*newSize,
							this.pos.y+y*newSize,
							this.pos.z+z*newSize,
							newSize
						);
						boxes.push(b);
					}
				}
			}
		}
		return boxes;
	}

	show() {
		push();
		translate(this.pos.x, this.pos.y, this.pos.z);
		box(this.size * 0.98);
		pop();
	}
}