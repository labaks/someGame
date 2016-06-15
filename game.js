window.onload = init;

var map;
var ctxMap;

var pl;
var ctxPl;

var enemyCv;
var ctxEnemy;

var stats;
var ctxStats;

var newGameBtn;

var gameWidth = 800;
var gameHeight = 500;

var bg = new Image();
bg.src = "img/bg.jpg";

var bg1 = new Image();
bg1.src = "img/bg.jpg";

var tiles = new Image();
tiles.src = "img/tiles.png";

var player;
var enemies = [];

var isPlaying;
var health;
var distance;

var distanceInterval;

var mapX = 0;
var map1X = gameWidth;
var velBg = 5;
var bgWidth = 3000;
var bgHeight = 1500;

//For creating enemies
var spawnInterval;
var spawnTime = 10000;
var spawnAmount = 10;

var requestAnimFrame = window.requestAnimationFrame ||
						window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame ||
						window.oRequestAnimationFrame ||
						window.msRequestAnimationFrame;

function init() {
	map = document.getElementById("map");
	ctxMap = map.getContext("2d");

	pl = document.getElementById("player");
	ctxPl = pl.getContext("2d");

	enemyCv = document.getElementById("enemy");
	ctxEnemy = enemyCv.getContext("2d");

	stats = document.getElementById("stats");
	ctxStats = stats.getContext("2d");

	map.width = gameWidth;
	map.height = gameHeight;
	pl.width = gameWidth;
	pl.height = gameHeight;
	enemyCv.width = gameWidth;
	enemyCv.height = gameHeight;
	stats.width = gameWidth;
	stats.height = gameHeight;

	ctxStats.fillStyle = "#FFFFFF";
	ctxStats.font = "bold 35 Arial"

	newGameBtn = document.getElementById("newGame");

	player = new Player;

	resetHealth();
	resetDistance();
	drawBg();
	player.draw();

	document.addEventListener("keydown", checkKeyDown, false);
	document.addEventListener("keyup", checkKeyUp, false);
	newGameBtn.addEventListener("click", startGame, false);

}

function startGame() {
	resetHealth();
	resetDistance();
	drawBg();
	clearCtxPl();
	player.drawX = 10;
	player.drawY = 218;
	player.draw();
	startLoop();
	destroyEnemies();
	countDistance();
}

function resetHealth() {
	health = 20;
}

function resetDistance() {
	distance = 0;
}

function spawnEnemy(count) {
	for (var i = 0; i < count; i++) {
		enemies[i] = new Enemy();
	}
}

function destroyEnemies() {
	for (var i = enemies.length - 1; i >= 0; i--) {
		enemies[i].destroy();
	}
}

function startCreatingEnemies() {
	stopCreatingEnemies();
	spawnInterval = setInterval(function(){spawnEnemy(spawnAmount)}, spawnTime);
}

function stopCreatingEnemies() {
	clearInterval(spawnInterval);
}

function countDistance() {
	stopCountDistance();
	distanceInterval = setInterval(function(){distance++}, 1000);
}

function stopCountDistance() {
	clearInterval(distanceInterval);
}

function loop() {
	if(isPlaying) {
		draw();
		update();
		requestAnimFrame(loop);
	}
}

function startLoop() {
	if(!isPlaying) {
		isPlaying = true;
		loop();
		startCreatingEnemies();
	}
}

function stopLoop() {
	isPlaying = false;}

function draw() {
	player.draw();

	clearCtxEnemy();
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].draw();
	}
}

function update() {
	moveBg();
	drawBg();
	updateStats();
	player.update();

	for (var i = 0; i < enemies.length; i++) {
		enemies[i].update();
	}
}

function moveBg() {
	mapX -= velBg;
	map1X -= velBg;
	if(mapX + gameWidth < 0) mapX = gameWidth - 5;
	if(map1X + gameWidth < 0) map1X = gameWidth - 5;

}

//Objects
function Player() {
	this.srcX = 128;
	this.srcY = 96;
	this.drawX = 10;
	this.drawY = 218;
	this.width = 32;
	this.height = 32;
	this.speed = 5;

	this.isUp = false;
	this.isDown = false;
	this.isLeft = false;
	this.isRight = false;
}

Player.prototype.draw = function() {
	clearCtxPl();
	ctxPl.drawImage(tiles, this.srcX, this.srcY, this.width, this.height, //image parammeters
		this.drawX, this.drawY, this.width, this.height); //coordinates on canvas
}

Player.prototype.update = function() {

	if(health <= 0) stopLoop();
	if(this.drawX < 0) this.drawX = 0;
	if(this.drawX > gameWidth - this.width) this.drawX = gameWidth - this.width;
	if(this.drawY < 0) this.drawY = 0;
	if(this.drawY > gameHeight - this.height) this.drawY = gameHeight - this.height;

	for (var i = 0; i < enemies.length; i++) {
		if(this.drawX >= enemies[i].drawX &&
			this.drawY >= enemies[i].drawY &&
			this.drawX <= enemies[i].drawX + enemies[i].width &&
			this.drawY <= enemies[i].drawY + enemies[i].height) {
			health -= 3;
		}
	}
	this.chooseDir();
}

Player.prototype.chooseDir = function() {
	if(this.isUp)
		this.drawY -= this.speed;
	if(this.isDown)
		this.drawY += this.speed;
	if(this.isLeft)
		this.drawX -= this.speed;
	if(this.isRight)
		this.drawX += this.speed;
}

function Enemy() {
	this.srcX = 320;
	this.srcY = 0;
	this.drawX = Math.floor((Math.random() * gameWidth) + gameWidth);
	this.drawY = Math.floor((Math.random() * gameHeight));
	this.width = 32;
	this.height = 32;
	this.speed = 5;
}

Enemy.prototype.draw = function() {
	ctxEnemy.drawImage(tiles, this.srcX, this.srcY, this.width, this.height, //image parammeters
		this.drawX, this.drawY, this.width, this.height); //coordinates on canvas
}

Enemy.prototype.update = function() {
	this.drawX -= this.speed;

	if(this.drawX + this.width < 0) {
		this.destroy();
	}
}

Enemy.prototype.destroy = function() {
	enemies.splice(enemies.indexOf(this), 1);
}

function checkKeyDown(e) {
	var keyID = e.keyCode || e.which;
	var keyChar = String.fromCharCode(keyID);

	if(keyChar == "W") {
		player.isUp = true;
		e.preventDefault();
	}
	if(keyChar == "S") {
		player.isDown = true;
		e.preventDefault();
	}
	if(keyChar == "A") {
		player.isLeft = true;
		e.preventDefault();
	}
	if(keyChar == "D") {
		player.isRight = true;
		e.preventDefault();
	}
}

function checkKeyUp(e) {
	var keyID = e.keyCode || e.which;
	var keyChar = String.fromCharCode(keyID);

	if(keyChar == "W") {
		player.isUp = false;
		e.preventDefault();
	}
	if(keyChar == "S") {
		player.isDown = false;
		e.preventDefault();
	}
	if(keyChar == "A") {
		player.isLeft = false;
		e.preventDefault();
	}
	if(keyChar == "D") {
		player.isRight = false;
		e.preventDefault();
	}
}

function clearCtxPl() {
	ctxPl.clearRect(0, 0, gameWidth, gameHeight);
}

function clearCtxEnemy() {
	ctxEnemy.clearRect(0, 0, gameWidth, gameHeight);
}

function updateStats() {
	ctxStats.clearRect(0, 0, gameWidth, gameHeight);
	ctxStats.fillText("Health: " + health, 10, 20);
	ctxStats.fillText("Distance: " + distance + " meters", 680, 20);
}

function drawBg() {
	ctxMap.clearRect(0, 0, gameWidth, gameHeight);
	ctxMap.drawImage(bg, 0, 0, bgWidth, bgHeight, //image parammeters
		mapX, 0, gameWidth, gameHeight); //coordinates on canvas
	ctxMap.drawImage(bg1, 0, 0, bgWidth, bgHeight, //image parammeters
		map1X, 0, gameWidth, gameHeight); //coordinates on canvas
}
