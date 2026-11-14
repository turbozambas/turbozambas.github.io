let title="fibonacci";
let date="Nov 2026";
let desc="fib's golden spiral";
$("title").text(`${title} by turbozambas`);
$("footer p").text(`${desc} - ${date}`);

let canvasSize=600;
let drawingSize=400;
let bgColor='#ffe6ae';
let angle=45; // set starting hypotenuse angle

const squares = {

}

function setup() {
	createCanvas(canvasSize, canvasSize);
	noLoop();
}

function fibonacci(n) { // Fib Sequence F(n)=F(n-1)+F(n-2))
	let sequence=[0,1]; // sequence starting point
	for (let i=2;i<=n;i++) sequence[i]=sequence[i-1]+sequence[i-2];
	return sequence;
}

function calcSquares(f,n) {
	let l=0;
	let h=[];
	let square=[];
	for (let i=0;i<n;i++) {
		let squareSize=f[i];
		l+=squareSize;
	}
	let t=drawingSize; // target length
	let scaleFactor= t/l;
	let scaledFib=f.map(n => n*scaleFactor); // scaled square sizes
	for (let i=0;i<n;i++) h[i]=Math.sqrt(scaledFib[i]*scaledFib[i]*2); // scaled hipothenuse sizes
	console.log(scaledFib);
	console.log(h);
	for (let i=0;i<n;i++) {
		if (i===0) {
			let x=[100,100,100+scaledFib[i],100+scaledFib[i]];
			let y=[100,100+scaledFib[i],100+scaledFib[i],100];
			drawSquare(x,y);
		}
		//squares.push(square);
	}
}

function drawSquare(x,y) {
	quad(x[0], y[0], x[1], y[1], x[2], y[2], x[3], y[3]);
	console.log(x);
	console.log(y);
}

function draw() {
	background(bgColor);
	let fib=fibonacci(8).reverse(); // calculate fibo sequence 
	calcSquares(fib,8); // draw squares
}

