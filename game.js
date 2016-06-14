window.onload = init;

var map;
var ctxMap;

var drawBtn;
var clearBtn;

var gameWidth = 800;
var gameHeight = 500;

var bg = new Image();
bg.src = "bg.jpg";

function init() {
	map = document.getElementById("map");
	ctxMap = map.getContext("2d");

	map.width = gameWidth;
	map.height = gameHeight;

	drawBtn = document.getElementById("drawBtn");
	clearBtn = document.getElementById("clearBtn");

	drawBtn.addEventListener("click", drawRect, false);
	clearBtn.addEventListener("click", clearRect, false);

	drawBg();

}

function drawRect() {
	ctxMap.fillStyle = "3D3D3D";
	ctxMap.fillRect(10, 10, 100, 100);
	// console.log("x = " + x + "; y = " + y + "; w = " + w + "; h = " + h);

}

function clearRect() {
	ctxMap.clearRect(0, 0, 800, 500);
	drawBg();
	
}

function drawBg() {
	ctxMap.drawImage(bg, 0, 0, 800, 480, //image
		0, 0, gameWidth, gameHeight); //coordinates
}

// function getRandomInt(min, max) {
// 	return Math.floor(Math.random() * (max - min + 1)) + min;
// }
