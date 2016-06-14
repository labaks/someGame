window.onload = init;

var map;
var ctxMap;

var pl;
var ctxPl;

var drawBtn;
var clearBtn;

var gameWidth = 800;
var gameHeight = 500;

var bg = new Image();
bg.src = "img/bg.jpg";

var tiles = new Image();
tiles.src = "img/tiles.png";

var player;

function init() {
	map = document.getElementById("map");
	ctxMap = map.getContext("2d");

	pl = document.getElementById("player");
	ctxPl = pl.getContext("2d");

	map.width = gameWidth;
	map.height = gameHeight;

	pl.width = gameWidth;
	pl.height = gameHeight;

	drawBtn = document.getElementById("drawBtn");
	clearBtn = document.getElementById("clearBtn");

	drawBtn.addEventListener("click", drawRect, false);
	clearBtn.addEventListener("click", clearRect, false);

	player = new Player;

	drawBg();
	draw();

}

function draw() {
	player.draw();
}

function Player() {
	this.srcX = 0;
	this.srcY = 0;
	this.drawX = 0;
	this.drawY = 0;
	this.width = 256;
	this.height = 256;
	this.speed = 5;
}

Player.prototype.draw = function() {
	ctxMap.drawImage(tiles, this.srcX, this.srcY, this.width, this.height, //image parammeters
		this.drawX, this.drawY, this.width / 2, this.height / 2); //coordinates on canvas
}

function drawRect() {
	ctxMap.fillStyle = "3D3D3D";
	ctxMap.fillRect(10, 10, 100, 100);
}

function clearRect() {
	ctxMap.clearRect(0, 0, 800, 500);
	drawBg();
}

function drawBg() {
	ctxMap.drawImage(bg, 0, 0, 800, 480, //image parammeters
		0, 0, gameWidth, gameHeight); //coordinates on canvas
}

// function getRandomInt(min, max) {
// 	return Math.floor(Math.random() * (max - min + 1)) + min;
// }
