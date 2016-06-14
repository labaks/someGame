window.onload = init;

var map;
var ctxMap;

var player;
var ctxPlayer;

var drawBtn;
var clearBtn;

var gameWidth = 800;
var gameHeight = 500;

var bg = new Image();
bg.src = "img/bg.jpg";

var tiles = new Image();
tiles.src = "img/tiles.png";

function init() {
	map = document.getElementById("map");
	ctxMap = map.getContext("2d");

	player = document.getElementById("player");
	ctxPlayer = player.getContext("2d");

	map.width = gameWidth;
	map.height = gameHeight;

	player.width = gameWidth;
	player.height = gameHeight;

	drawBtn = document.getElementById("drawBtn");
	clearBtn = document.getElementById("clearBtn");

	drawBtn.addEventListener("click", drawRect, false);
	clearBtn.addEventListener("click", clearRect, false);

	drawBg();
	drawPlayer();

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

function drawPlayer() {
	ctxMap.drawImage(tiles, 0, 0, 256, 256, //image
		0, 0, 256, 256); //coordinates
}

// function getRandomInt(min, max) {
// 	return Math.floor(Math.random() * (max - min + 1)) + min;
// }
