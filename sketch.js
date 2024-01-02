var bullets=70
var gameState="play"
var shooter
var shootAnimation
var lives=3
var score=0
var zombie

var zombieGroup
var bullet
var bulletGroup
var playSound="play"

function preload(){
   bgImg=loadImage("./assets/bg.jpeg")
   shooterImg=loadImage("./assets/shooter_2.png")
   shooter2Img=loadAnimation("./assets/shooter_1.png","./assets/shooter_3.png")
   shooter2Img.looping=false
   zombieImg=loadImage("./assets/zombie.png")
   explosionSound=loadSound("./assets/explosion.mp3")
   loseSound=loadSound("./assets/lose.mp3")
   loseSound.looping=false
}

function setup(){
  createCanvas(windowWidth, windowHeight)

  shooter=createSprite(100,windowHeight-115,50,50)
  shooter.addImage("shoot1",shooterImg)
  shooter.addAnimation("shoot",shooter2Img)
  shooter.scale=0.45
  shooter.debug=true
  shooter.setCollider("rectangle",0,0,300,300)
  zombieGroup=new Group()
  bulletGroup=new Group()

}

function draw(){
  background(bgImg)
  spawnZombies()



  if (keyDown("UP_ARROW")){
    shooter.position.y-=5
  }
if (keyDown("DOWN_ARROW")){
  shooter.position.y+=5
}
if (keyWentDown("space") && gameState!="over"){
  shooter.changeAnimation("shoot")
  bullet=createSprite(shooter.position.x+60,shooter.position.y-30,20,10)
  bullet.velocityX=14
  bulletGroup.add(bullet)
  bullets=bullets-1
}

if (keyWentUp("space")){
  shooter.changeImage("shoot1")
}

if (zombieGroup.isTouching(shooter)){
  for(var i=0;i<zombieGroup.length;i++){
    if (zombieGroup[i].isTouching(shooter)){
      lives=lives-1
      zombieGroup[i].destroy()
    }
  }
}
  for(var i=0;i<zombieGroup.length;i++){

    if (zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy()
      bulletGroup.destroyEach()
      score=score+1
      explosionSound.play()
    }
    if(zombieGroup[i].position.x<0){
      score=score-5
 
    }
}

 

if (lives==0 || bullets==0 || score<=-1){
  gameState="over"
}
if (gameState=="over"){
  textSize(70)
  fill("white")
  text("Game Over" , width/2,height/2)
  shooter.destroy()
  zombieGroup.destroyEach()
  bulletGroup.destroyEach()
  loseSound.setVolume(0.2)
  if (playSound=="play"){
    loseSound.play()
    playSound="stop"
  }


}

  drawSprites()
  textSize(20)
  fill("yellow")
  text("Bullets: "+ bullets,width-150,50)
  fill("red")
  text("Lives: "+ lives,width-150,70)
  fill("white")
  text("Score: "+ score,width-150,30)
}

function spawnZombies(){
  if (frameCount%70==0){
    zombie=createSprite(width,random(100,500),40,40)
      zombie.velocityX=-3
      zombie.addImage(zombieImg)
      zombie.scale=0.15
      zombie.lifetime=500
      zombie.debug=true
      zombie.setCollider("rectangle",0,0,400,400)
      zombieGroup.add(zombie)
    }
  }
