const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

let x =0;
const img1 = new Image();
img1.src = 'shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;
let frameX = 0;
let frameY = 4;
let gameFrame = 0;
let staggerFrame = 5;

const data = [];
const states = [
	{name: 'idle', frames: 7,},
	{name: 'jump', frames: 7,},
	{name: 'fall',frames: 9,},
	{name: 'run',frames: 9,},
	{name: 'dizzy',frames: 11,},
	{name: 'sit',frames: 5,},
	{name: 'roll',frames: 7,},
	{name: 'bite',frames: 7,},
	{name: 'ko',frames: 12,},
	{name: 'getHit',frames: 4,}
];
let curState = "idle";
const dropdown = document.getElementById('animationTypes');
dropdown.addEventListener('change',function (e) {
	curState = e.target.value;
})

states.forEach((state, idx) => {
	let frame = {
		location: [],
	}
	for (let i = 0; i < state.frames; i++) {
		let posX = i * spriteWidth;
		let posY = idx * spriteHeight;
		frames.location.push({x: posX, y: posY});
	}
	data[state.name] = frames;
})

console.log(states);

function animate() {
    
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	//ctx.fillRect(x, 50, 100, 100);
	let position = Math.floor(gameFrame/staggerFrame) % data[curState].location.length;
	frameX = spriteWidth * position;
	frameX = data[curState].location[position].y;

	ctx.drawImage(img1, frameX, frameY, spriteWidth, spriteHeight
					  , 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	gameFrame++;
	requestAnimationFrame(animate);
};

animate();
