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
let frameY = 0;
let gameFrame = 0;
let staggerFrame = 5;

function animate() {
    
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	//ctx.fillRect(x, 50, 100, 100);
	
	ctx.drawImage(img1, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight
					  , 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	if (!(gameFrame % staggerFrame)) {
		frameX = frameX < 6 ? frameX+1 : 0;
		frameY = frameY < 4 ? frameY+1 : 0;
	}
	gameFrame++;
	requestAnimationFrame(animate);
};

animate();
