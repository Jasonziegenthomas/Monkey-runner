var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstaclesGroup;
var survivalTime=0;
var score = 0;
var ground,groundImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacle1 = loadImage("obstacle.png");
  //monkey = loadImage("sprite_0.png")
  obstaclesGroup = new Group()
  bananaGroup = new Group()
}


function setup() {
  createCanvas(600,500)
  monkey = createSprite(100,410)
 monkey.addAnimation("moving",monkey_running)
  monkey.scale = 0.1
  ground = createSprite(600,450,1000,10)
  ///ground.velocityX = -3
  ground.x=ground.width/2;
  console.log(ground.x)
  
}


function draw() {
background(1555)
  
  if (gameState === PLAY) {
  if(keyDown("space")&& monkey.y >= 320) {
        monkey.velocityY = -12;
        
    }
  if(bananaGroup.isTouching(monkey)){
    
     bananaGroup.destroyEach()
    score = score+1
  }
    if(monkey.isTouching(obstaclesGroup)){
      gameState=END;
    }
    survivalTime=Math.ceil(frameCount/frameRate())
  text("survivalTime: "+ survivalTime, 20,50);
  }
  else if (gameState === END) {
  survivalTime=0;
  if(monkey.isTouching(obstaclesGroup)){
    fill("blue")
    text("GameOver",270,225)
    banana.visible=false;
    monkey.velocityX = 0;
    bananaGroup.velocityX = 0;
   // monkey.collide(obstaclesGroup)
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
     if(keyDown("space")&& monkey.y >= 320) {
        monkey.velocityY = 0;
       //survivalTime.visible=false
      
    }
  }
    
  }
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground)
  
  spawnClouds()
  spawnObstacles()
  drawSprites()
  textSize(20)
    fill(0)
    text("Score: "+ score, 500,50);
  textSize(20)
  fill(0)
  

}

function spawnObstacles(){
 if (frameCount % 80 === 0){
   var obstacle = createSprite(590,415,10,40);
   obstacle.velocityX = -6;
   obstacle.addImage(obstacle1)

      
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
   //adding obstacles to the group
   obstaclesGroup.add(obstacle);
 }
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 90 === 0) {
     banana = createSprite(600,600,40,10);
    banana.y = Math.round(random(300,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 234;
    
    //adjust the depth
    banana.depth = banana.depth;
    banana.depth = banana.depth + 1;
    
    //adding cloud to the group
   bananaGroup.add(banana);
  
    }
}


