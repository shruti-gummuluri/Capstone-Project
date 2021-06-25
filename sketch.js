var monkey1, monkey2, monkey3, monkey4, monkey5, monkey6, monkey7;
var tree1, tree2;
var stone;
var bg;
var boy;
var score = 0;
var gameState = "START"

var monkeyGroup

function preload(){
  monkeyimg= loadAnimation("Monkey 1.png","Monkey 2.png","Monkey 3.png","Monkey 4.png","Monkey 5.png","Monkey 6.png","Monkey 7.png");
  monkeysit= loadAnimation("Monkey 1.png");
  tree1= loadImage("Tree 1.png");
  tree2 = loadImage("Tree 2.png");
  bg= loadImage("Background.jpg");
  boysh = loadImage("Boy Shooting.png");
  boyang = loadImage("Boy Angry.png");
  boyHap = loadImage("Boy Hapy.png");
  stoneimg = loadImage("Stone.png");
}

function setup(){
  createCanvas(1200,700);

  tree = createSprite(1000,490,20,50);
  tree.addImage(tree1);
  tree_2 = createSprite(100,400,20,50);
  tree_2.addImage(tree1);
  tree_1 = createSprite(500,450,30,60);
  tree_1.addImage(tree2);
  tree_3 = createSprite(700,400,20,50);
  tree_3.addImage(tree2);

  boy1 = createSprite(100,600,10,30);
  boy1.addImage(boysh);
  boy1.scale = 0.5;

  stone = createSprite(130,560)
  stone.scale = 0.03

  monkeyGroup = new Group();
}

function draw(){
  textSize(30);
  fill("red");
 
  if(gameState==="START"){
    background(0);
    textSize(30);
    strokeWeight(2);
    stroke("yellow")
    fill("yellow");
    text("INSTRUCTIONS",500,200)
    stroke("teal")
    fill("yellow");
    text("To go to the Next Page, Press RIGHT ARROW!!",300,400);
    if(keyDown("RIGHT_ARROW")){
      gameState="PLAY";
    }
  }

  if(gameState === "PLAY"){
    background(bg);
    fill("purple");
    text("To play the game Press SPACE BAR ",100,60);
    fill("blue");
    text("SCORE: "+score,900,50);
    stone.addImage(stoneimg)
    // if(monkeyGroup.isTouching(tree) || monkeyGroup.isTouching(tree_1) || monkeyGroup.isTouching(tree_2)  || monkeyGroup.isTouching(tree_3)){
    //   spawnMonkey();
    // }
    if(keyDown("space")){
      stone.addImage(stoneimg)
      stone.x = 130;
      stone.y = 560;
      stone.velocityX = 4;
      stone.velocityY = -8;
    }
  
    for (var i = 0; i<monkeyGroup.length; i++){
  
      if(monkeyGroup.get(i).isTouching(stone)){
        //stone.velocityY = stone.velocityY + 0.05;
        monkeyGroup.get(i).remove();
        score = score + 2;
      }
  }
  stone.velocityY = stone.velocityY + 0.05;

  if(stone.y<350){
    console.log(stone.y)
    stone.velocityY = stone.velocityY + 0.05
  }

  spawnMonkey();
  if(score === 10){
    gameState = "END";
  }
  drawSprites();
}
  if(gameState === "END"){
  fill("pink");
  textSize(30);
  text("GAME ENDED");
}
}

function spawnMonkey(){
  if (frameCount%250===0){
    mk=createSprite(0,200,10,30)
    ran=Math.round(random(1,3));
    if(ran===1){
      mk.addAnimation("jumping",monkeyimg)
      mk.velocityX = 6
    }
    else if(ran===2){
      mk.addAnimation("jumping",monkeyimg);
      mk.velocityX = 4
    }
    else if(ran === 3){  
    mk.addAnimation("jumping",monkeyimg)
    mk.velocity = 5
    }
    else{
    null
    }
    mk.velocityY = mk.velocityY + 0.5
    monkeyGroup.add(mk)
  }
}

function shoot(){
  var newAngle = Stone.angle - 0.5 
  var velocity = p5.Vector.fromAngle(newAngle);
  velocity.mult(20); Matter.Body.setStatic(this.body, false);
  Matter.Body.setVelocity(this.body, { x: velocity.x, y: velocity.y });
   }