var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0 ;


var castle,castleImg;
var backgroundI , backgroundIimg ; 
var boy;
var boyImg ; 
var  Coin , coinImg;
var GameOverImg,GameOver ; 
var ground ; 
var wellDone,wellDoneImg;





function preload(){
  boyImg = loadAnimation("images/source.gif");
  backgroundIimg = loadImage("images/forest.png");
  castleImg = loadImage("images/Castle.png");
  coinImg = loadAnimation("images/Coin.gif");
  monsterImg = loadAnimation("images/Monster.gif");
  GameOverImg = loadAnimation("images/gameover.gif");
  wellDoneImg = loadAnimation("images/WELL DONE.gif");
  
}


function setup() {
  createCanvas(1500,750);
  
  backgroundI = createSprite(0,0,800,800);
  backgroundI.addImage("background1",backgroundIimg);
  backgroundI.scale = 3 ;
  backgroundI.x = backgroundIimg.width/2 ;
  backgroundI.velocityX = -4 ;
  
  
  boy = createSprite(150,300,40,60);
  boy.addAnimation("boy1",boyImg);
  boy.scale = 0.5;
  boy.setCollider("rectangle",0,300,300,500)

  ground = createSprite(650,900,1500,200);
 
 CoinsGroup = new Group();
 monstersGroup = new Group();
 castlesGroup = new Group();
  


  

}



function draw() {


  backgroundI.velocityX = -4 ;

  
  
  if (gameState === PLAY){


    score = score + Math.round(getFrameRate()/60);
  

    if(backgroundI.x < 0 ){
      backgroundI.x = backgroundIimg.width/2 ;
    
    }

    if(CoinsGroup.isTouching(boy)){
      score = score+2;
      CoinsGroup.destroyEach();  
    }

   

     if(keyDown("space")) {
      boy.velocityY = -10;
    
    }
    
    boy.velocityY = boy.velocityY + 0.8
  
   SpawnCoins();
  SpawnMonster();
  SpawnCastle();

   
  if(monstersGroup.isTouching(boy)){
    GameOver = createSprite(600,400,60,10);
    GameOver.addAnimation("GameOver1",GameOverImg);
    gameState = END ; 
   }

   if(castlesGroup.isTouching(boy)){
    wellDone = createSprite(600,400,60,10);
    wellDone.addAnimation("WellDone",wellDoneImg);
    score = score+100;
    gameState = END ; 
  
  }
     
   

  }
  
 
  else if ( gameState === END){
 


    fill("black");
    textSize(18);
    text("- RELOAD THE PAGE TO RESTART -",600,430);

    backgroundI.velocityX = 0;
    ground.velocityX = 0;
    boy.velocityX = 0 ;
    castlesGroup.setVelocityXEach(0);
    CoinsGroup.setVelocityXEach(0);
    monstersGroup.setVelocityXEach(0);

    CoinsGroup.setLifetimeEach(-1);
    monstersGroup.setLifetimeEach(-1);
    castlesGroup.setLifetimeEach(-1);
    score = score ; 
    
  }

  

  

  boy.collide(ground);


  drawSprites();
  text("Score: "+ score, 500,50);

}




    function SpawnCoins(){
            if (World.frameCount % 360 === 0) {
              Coin = createSprite(1100,200,40,10);
              Coin.addAnimation("Coin",coinImg);
              Coin.scale = 0.2;
              Coin.velocityX = -3;
              
              Coin.lifetime = 1600;
              CoinsGroup.add(Coin);

              
              
            }
            
          }

          
    function   SpawnMonster(){
        if (World.frameCount % 310 === 0) {
          var monster = createSprite(1100,550,40,10);
          monster.addAnimation("Monster",monsterImg);
         
          monster.velocityX = -3;
          monster.debug = false ;
          monster.setCollider("rectangle",0,0,150,100)
          monster.lifetime = 2000;
          monstersGroup.add(monster);

          
          
          
        }
        
      }

      function SpawnCastle(){
        if(World.frameCount === 45000){
        castle = createSprite(1200,500,70,80);
        castle.addImage("castle1",castleImg);
        castle.scale = 0.5 ; 
        castlesGroup.add(castle);
      }
    }
          
    



  
  
 



  
  
    
  
  
  


