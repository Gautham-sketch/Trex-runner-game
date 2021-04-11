var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var gameover;
var obstacleGroup;
var cloudGroup;
var restartgame;
var newImage;
var score;
var play = 1;
var end = 0;
var gamestate = play;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  gameover = loadImage("gameOver.png");
  groundImage = loadImage("ground2.png");
  restartgame = loadImage("restart.png");
  cloudImage = loadImage("cloud.png");
  
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
 
}

function setup() {
  createCanvas(600, 200);
  obstacleGroup = new Group();
  cloudGroup = new Group();
  gameOver = createSprite(300,100);
  gameOver.addImage(gameover);
  gameOver.scale = 0.5;
  restart = createSprite(300,130);
  restart.addImage(restartgame);
  restart.scale = 0.5;
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  console.log("HELLO ; " + "Gautham");
  score = 0;
  gameOver.visible = false;
  restart.visible = false;
}

function draw() {
  background("blue");
  text("SCORE ; " + score ,500,50);
  
  if (gamestate === play){
    ground.velocityX = -4;
    score = score + Math.round(frameCount / 120);
    if (ground.x < 0){
    ground.x = ground.width/2;}
    gameOver.visible = false;
    restart.visible = false;
    if(keyDown("space") && trex.y>=100) {
    trex.velocityY = -10;
  }
     trex.velocityY = trex.velocityY + 0.8
     //spawn the clouds
  spawnClouds();
  spawnObstacles();
    if (obstacleGroup.isTouching(trex)){
      gamestate = end;
      obstacleGroup.setVelocityXEach(0);
      cloudGroup.setVelocityXEach(0);
    }
  }
  else if (gamestate === end){
    ground.velocityX = 0;
 trex.changeAnimation("collided",trex_collided);
    trex.velocityY = 0;
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    gameOver.visible = true;
    restart.visible = true;
    if (mousePressedOver(restart)){
      reset();
      console.log("GAME OVER");
    }
  }
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    cloud.lifetime = 200;
    cloudGroup.add(cloud);
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
  }
}
function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -5;
    var rand = Math.round(random(1,6))
    switch(rand){
        case 1:obstacle.addImage(obs1);
        break
        case 2:obstacle.addImage(obs2);
        break
        case 3:obstacle.addImage(obs3);
        break
        case 4:obstacle.addImage(obs4);
        break
        case 5:obstacle.addImage(obs5);
        break
        case 6:obstacle.addImage(obs6);
        break
        default:break
    }
        obstacle.scale = 0.6;
        obstacle.lifetime = 200;
        obstacleGroup.add(obstacle);
  }
}
  function reset(){
    gamestate = play;
    obstacleGroup.destroyEach();
    cloudGroup.destroyEach();
    trex.changeAnimation("running",trex_running);
    score = 0;
  }
