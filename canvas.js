//Simple Horizontal Space Shmup by Riadh Gharbi 2018 

//Variables
var canvas,
c,   //the context
//canvas size
width = 1000,
height= 600,
//player position
player_x = 25,
player_y = height/2,
//player size
player_w = 20,
player_h =20,
//ControlKeys
right=false,
left=false,
up=false,
down=false,
//enemies 
enemyTotal=5,
enemies = [],
//first enemy pos
enemy_x = width + 40,
enemy_y = height/6 ,
//enemy size
enemy_w = 20,
enemy_h = 20,

enemySpeed=3,
playerSpeed=3


function clearCanvas(){
	c.clearRect(0,0,width, height);
}
for (var i = 0; i < enemyTotal; i++) {
  enemies.push([enemy_x, enemy_y, enemy_w, enemy_h, enemySpeed]);
  enemy_y += enemy_h +100 ;
}
function drawPlayer(){
	//movement
	if (right) player_x +=playerSpeed;
	else if (left) player_x -=playerSpeed;
	if (up) player_y -=playerSpeed;
	else if (down) player_y +=playerSpeed;
    //keep the player in the screen
    if (player_x <= 0) player_x =0;
    if ((player_x+ player_w)>=width) player_x =width- player_w;
    if (player_y <=0) player_y=0;
    if ((player_y+player_h)>=height) player_y = height - player_h;
	c.fillStyle = 'rgba(255,0,0,0.5)';
	c.fillRect (player_x,player_y,player_w,player_h);
    
}

// function Enemy (x,y){
// 	this.x =x;
// 	this.y =y;
// 	this.draw = function(){
// 		c.fillStyle = 'rgba(0,255,0,0.5)';
// 		c.fillRect (this.x , this.y , enemy_w, enemy_h);

// 	}
// }
// function drawEnemy () {
// 	for (i=0; i<enemyTotal ; i++){
// 		var y= i * 20;
// 		Enemy(-30, height-y );
// 	}
// }
function drawEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    c.fillStyle = 'rgba(0,255,0,0.5)';
    c.fillRect(enemies[i][0], enemies[i][1], enemy_w, enemy_h);
  }
}

//var timecount =0;
function moveEnemies() {
//changes between the different possible patterns the enemies come in
var count = Math.floor((Math.random() * 5) + 1);
switch (count) {
	case 1:
		for (var i = 0; i < enemies.length; i++) {
    if (enemies[i][0] > 0) {
      enemies[i][0] -= enemies[i][4];
    } else if (enemies[i][0] < width - 1) {
      enemies[i][0] = width + 70;
    }
  }
		break;
	case 2:
		for (var i = 0; i < enemies.length ; i++){
			if (enemies[i][0] > 0){
				enemies[i][0] -= enemies[i][4]*i;
			}else if (enemies[i][0] < width - 1){
				enemies[i][0] = width + 70;
			}
		}
		break;
	case 3:
		for (var i = 0; i < enemies.length ; i++){
			if (enemies[i][0] > 0){
				enemies[i][0] -= enemies[i][4]*3*i;
			}else if (enemies[i][0] < width - 1){
				enemies[i][0] = width + 70;
			}
		}
		break;
	case 4:
		for (var i = 0; i < enemies.length ; i++){
			if (enemies[i][0] > 0){
				enemies[i][0] -= enemies[i][4]+i;
			}else if (enemies[i][0] < width - 1){
				enemies[i][0] = width + 70;
			}
		}
		break;		
    case 5:
        for (var i = 0; i < enemies.length ; i++){
			if (enemies[i][0] > 0){
				enemies[i][0] -= enemies[i][4];
				enemies[i][1] += i*Math.sin(enemies[i][4]*2);
			}else if (enemies[i][0] < width - 1){
				enemies[i][0] = width + 70;
				enemies[i][1] = temp_y;
			}
		}
				
  }
  // for (var i = 0; i < enemies.length; i++) {
  //   if (enemies[i][0] > 0) {
  //     enemies[i][0] -= enemies[i][4];
  //   } else if (enemies[i][0] < width - 1) {
  //     enemies[i][0] = width + 70;
  //   }
  // }
}

function init(){
	canvas= document.getElementById('canvas');
	c = canvas.getContext('2d');
	setInterval(gameLoop, 25);
	document.addEventListener('keydown', keyDownHandler, false);
	document.addEventListener('keyup' ,keyUpHandler, false);
}

function keyDownHandler(e){
	if (e.keyCode ==39) right=true;
	else if (e.keyCode ==37) left=true;
	if(e.keyCode==38) up=true;
	else if (e.keyCode==40 ) down= true;
}
function keyUpHandler(e){
	if (e.keyCode ==39) right=false;
	else if (e.keyCode ==37) left=false;
	if(e.keyCode==38) up=false;
	else if (e.keyCode==40 ) down= false;
}

function gameLoop(){
	clearCanvas();
	moveEnemies();
    drawEnemies();
	drawPlayer();
}

window.onload = init;