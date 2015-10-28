var context;
var queue;
var WIDTH = 960;
var HEIGHT = 670;
var mouseXPosition;
var mouseYPosition;
var batImage;
var stage;
var animation;
var deathAnimation;
var spriteSheet;
var enemyXPos=100;
var enemyYPos=50;
var enemyXSpeed = 1.5;
var enemyYSpeed = 1.5;
var score = 0;
var scoreText;
var missed = 0;
var slippedByText;
var ground;
var allowed = 5;
var lvl = 1;
var timerSource; //references a setInterval method
var enemies = [];
var enTimer = null; // random timer for a new enemy
var enemyCount = 0;
var i = 0;
var heroXPos=470;
var heroYPos=500;

// get random number between X and Y
function getRand(x, y) {
    return Math.floor(Math.random()*y)+x;
}

window.onload = function()
{
    /*
     *      Set up the Canvas with Size and height
     *
     */
    var canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    context.canvas.width = WIDTH;
    context.canvas.height = HEIGHT;
    stage = new createjs.Stage("myCanvas");

    /*
     *      Set up the Asset Queue and load sounds
     *
     */
    queue = new createjs.LoadQueue(false);
    queue.installPlugin(createjs.Sound);
    queue.on("complete", queueLoaded, this);
    createjs.Sound.alternateExtensions = ["ogg"];

    /*
     *      Create a load manifest for all assets
     *
     */
    queue.loadManifest([
        {id: 'backgroundImage', src: 'assets/background.jpg'},
        {id: 'crossHair', src: 'assets/crosshair.png'},
        {id: 'shot', src: 'assets/shot.mp3'},
        {id: 'background', src: 'assets/countryside.mp3'},
        {id: 'gameOverSound', src: 'assets/gameOver.mp3'},
        {id: 'deathSound', src: 'assets/die.mp3'},
        {id: 'red', src: 'assets/red_enemy.png'},
        {id: 'hero', src: 'assets/hero.png'},
        {id: 'checkmark', src: 'assets/checkmark.png'},
    ]);
    queue.load();

    
    //  *      Create a timer that updates once per second
    //  *
     
    // gameTimer = setInterval(updateTime, 1000);

}

function queueLoaded(event)
{
    // Add background image
    // var ground = new createjs.Bitmap(queue.getResult("backgroundImage"))

    // examples.hideDistractor();

    var groundImg = queue.getResult("backgroundImage");
    ground = new createjs.Shape();
    ground.graphics.beginBitmapFill(groundImg).drawRect(0, -225, WIDTH + groundImg.width,  HEIGHT + groundImg.height);
    ground.tileH = groundImg.height;
    ground.y = groundImg.width;

    stage.addChild(ground);
    //Add Score
    scoreText = new createjs.Text("1UP: " + score.toString(), "36px Arial", "#FFF");
    scoreText.x = 10;
    scoreText.y = 10;
    stage.addChild(scoreText);

    //Add Score
    slippedByText = new createjs.Text("Enemies Missed: " + missed.toString(), "36px Arial", "#FFF");
    slippedByText.x = 625;
    slippedByText.y = 10;
    stage.addChild(slippedByText);

    // Play background sound
    // createjs.Sound.play("background", {loop: -1});

    // hero sprite sheet
    hero = new createjs.SpriteSheet({
        "images": [queue.getResult('hero')],
        "frames": {"width": 134, "height" : 158},
        "animations": {"walk1": [0,2] },
        framerate: 3
    });

    
    heroAni = new createjs.Sprite(hero, "walk1");
    heroAni.regX = 63;
    heroAni.regY = 78;
    heroAni.gotoAndPlay("walk1");

    heroAni.x = stage.canvas.width/2;
    // heroAni.y = getRand(0, WIDTH);
    // enemyXPos = heroAni.x;
    // enemyYPos = heroAni.y;
    heroAni.x = heroXPos;
    heroAni.y = heroYPos;

    stage.addChild(heroAni);

    //Now we create a Text object, used for displaying some debug details

        textOut = new createjs.Text("Debug","24px Arial","red");

        textOut.x = 5;

        textOut.y = 5;

        textOut.maxWidth = 390;

        stage.addChild(textOut);
    // Create crosshair
    crossHair = new createjs.Bitmap(queue.getResult("crossHair"));
    stage.addChild(crossHair);
    
    checkmark = new createjs.Bitmap(queue.getResult("checkmark"));
    stage.addChild(checkmark);

    // Add ticker
    // createjs.Ticker.setFPS(15);
    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.addEventListener('tick', enemyEvent);
    createjs.Ticker.addEventListener('tick', tickEvent);
    createjs.Ticker.addEventListener(onFrame);
    // createjs.Ticker.addEventListener('tick', randomEnemy);
    // createjs.Ticker.addEventListener('tick', this.pass);
    stage.update();
    // Set up events AFTER the game is loaded
    window.onmousemove = handleMouseMove;
    window.onmousedown = handleMouseDown;
}

// function heroMove(){

//     spriteSheet = new createjs.SpriteSheet({
//     "images": [queue.getResult('red')],
//     "frames": {"width": 134, "height": 158},
//     "animations": { "walk": [0,2] },
//     framerate: 6
//     });

//     createjs.Ticker.addEventListener('tick', enemyEvent);

//     // createjs.Ticker.addEventListener('tick', offScreen);

// } 


function typeEnemy(lvl)
{
    // this.lvl = lvl;
    lvl = 1;
    console.log("hmmm");
    if(lvl = 1 ){
    console.log("are you kiddin?");
        
    
        var hp = 1;

        console.log("are you kiddin again?");

        animation = new createjs.Sprite(enemy, "walk");
        animation.regX = 63;
        animation.regY = 78;
        animation.gotoAndPlay("walk");

        animation.x = getRand(0, context.canvas.height - 78);
        animation.y = getRand(0, context.canvas.height - 78);
        // enemyXPos = animation.x;
        // enemyYPos = animation.y;
        animation.x = enemyXPos;
        animation.y = enemyYPos;

        stage.addChild(animation);
        // createjs.Ticker.addEventListener('tick', enemyEvent);

        // stage.update(event);
        // createjs.EventDispatcher.initialize(typeEnemy); // add to a specific instance
        // function enemyEvent(){
        // //Make sure enemy is within game boundaries and move enemy 
        //     if(enemyXPos < WIDTH && enemyXPos > 0)
        //     {
        //         enemyXPos += enemyXSpeed;
        //     } else 
        //     {
        //         enemyXSpeed = enemyXSpeed * (-1);
        //         enemyXPos += enemyXSpeed;
        //     }
        //     if(enemyYPos < HEIGHT && enemyYPos > 0)
        //     {
        //         enemyYPos += enemyYSpeed;
        //     }

        //     createjs.Ticker.addEventListener('tick', offScreen);
        //     } 

        }
    
    // this.dispatchEvent(enemyEvent);
    // if(lvl = 2 ){

    //     function enemyBlue(){
    //         var hp = 3;
    //         var enemy = 1;

    //         if(enemyYPos > HEIGHT && enemyYPos < 0 ){
    //             missed += enemy;
    //             slippedByText.text = "Enemies Missed: " + missed.toString();
    //             delete enemyBlue();
    //         }
    //     }
    // }
    // animation = new createjs.Sprite(spriteSheet, "walk");
    // animation.regX = 63;
    // animation.regY = 78;
    // animation.x = enemyXPos;
    // animation.y = enemyYPos;
    // animation.gotoAndPlay("walk");
    // stage.addChildAt(animation, 3);
}

function createEnemy()
{
    typeEnemy();
}

function batDeath()
{
  deathAnimation = new createjs.Sprite(batDeathSpriteSheet, "die");
  deathAnimation.regX = 99;
  deathAnimation.regY = 58;
  deathAnimation.x = enemyXPos;
  deathAnimation.y = enemyYPos;
  deathAnimation.gotoAndPlay("die");
  stage.addChild(deathAnimation);
}

function enemyEvent()
{   
      
    if(i % 50 == 0){
        
        enemy = new createjs.SpriteSheet({
            "images": [queue.getResult('red')],
            "frames": {"width": 134, "height": 158},
            "animations": { "walk": [0,2] },
            framerate: 6
            });

        animation = new createjs.Sprite(enemy, "walk");
        animation.regX = 63;
        animation.regY = 78;
        animation.gotoAndPlay("walk");

        animation.x = getRand(-1, 960);
        // animation.y = getRand(960, -1);
        // enemyXPos = animation.x;
        // enemyYPos = animation.y;
        // animation.x = enemyXPos;
        // animation.y = enemyYPos;

        // var badguy = new createjs.Bitmap("images/badguy.png");
        // animation.x = getRand(-1,960)
        // animation.scaleX = 0.25;
        // animation.scaleY = 0.25;
        enemies.push(animation);

        stage.addChild(animation);
        // stage.addChild(enemy);
         
    }
    i++;
    if (enemies.length > 0) {
        for (var ekey in enemies) {
               if (enemies[ekey] != undefined) {

                    animation = enemies[ekey];

                    if(animation.x < WIDTH && animation.x > 0)
                        {
                            animation.x;
                        } else 
                        {
                            animation.x = animation.x * (-1);
                            // animation.x = getRand(50, 150);
                        }

                    animation.y += 5;

                    if(animation.y > HEIGHT && animation.y > 0 )  
                        {
                            // createjs.Ticker.reset('tick');
                            missed += 1;
                            slippedByText.text = "Enemies Missed: " + missed.toString();
                            // animation.x = enemyXPos;
                            // animation.y = enemyYPos;
                            delete enemies[ekey];
                            //Remove the sprite
                            stage.removeChild(animation);
                            // createjs.Ticker.addEventListener('tick', stage);
                            // createjs.Ticker.addEventListener('tick', tickEvent);
                            // createjs.Ticker.addEventListener('tick', enemyEvent);
                            
                            stage.update();
                            // createjs.Ticker.addEventListener('tick', enemyEvent);
                            // createjs.Ticker.addEventListener('tick', createEnemy);
                        }
                    
                }
            }
        }
}

// Ticker.setPaused(true);

function tickEvent(event)
{
    var deltaS = event.delta / 1000;

    ground.y = (ground.y + deltaS * 75) % ground.tileH;

    createjs.Ticker.setFPS(30);

    // if(i % 50 == 0){
        
    //     enemy = new createjs.SpriteSheet({
    //     "images": [queue.getResult('red')],
    //     "frames": {"width": 134, "height": 158},
    //     "animations": { "walk": [0,2] },
    //     framerate: 3
    //     });

    //     animation = new createjs.Sprite(enemy, "walk");
    //     animation.regX = 63;
    //     animation.regY = 78;
    //     animation.gotoAndPlay("walk");

    //     animation.x = getRand(0, context.canvas.height - 78);
    //     animation.y = getRand(0, context.canvas.height - 78);
    //     // enemyXPos = animation.x;
    //     // enemyYPos = animation.y;
    //     animation.x = enemyXPos;
    //     animation.y = enemyYPos;

    //     // var badguy = new createjs.Bitmap("images/badguy.png");
    //     animation.x = getRand(0,300)
    //     animation.scaleX = 0.25;
    //     animation.scaleY = 0.25;
    //     enemies.push(animation);

    //     stage.addChild(animation);
    //     // stage.addChild(enemy);
         
    // }
    // i++;

    // for(var n=0; n<enemies.length; n++){

    //     bg = enemies[n];

    //     if(bg.x < (enemyXPos < WIDTH && enemyXPos > 0)){
    //         bg.x += getRand(-1,1);
    //         enemyXPos += enemyXSpeed;
            
    //     } else {
    //         bg.x += getRand(-1,0);
    //         enemyXSpeed = enemyXSpeed * (-1);
    //         enemyXPos += enemyXSpeed;
    //     }


    //     bg.y += 1;

    //     if(enemyYPos < HEIGHT && enemyYPos > 0)
    //     {
    //         enemyYPos += enemyYSpeed;
    //     }
    // }

    // stage.update();


        // createjs.Ticker.addEventListener('tick', offScreen);


    // stage.update();
	// stage.update(event);
}
function onFrame(elapsedTime) {

    var angle = Math.atan2(mouseYPosition - checkmark.y, mouseXPosition - checkmark.x );

    angle = angle * (180/Math.PI);


    if(angle < 0)

    {

        angle = 360 - (-angle);

    }

    textOut.text = "X:" + mouseXPosition + " Y:" + mouseYPosition + " angle:" + Math.round(angle);

    checkmark.rotation =90 + angle;



    stage.update();

}
function handleMouseMove(event)
{
    //Offset the position by 45 pixels so mouse is in center of crosshair
    crossHair.x = event.clientX-200;
    crossHair.y = event.clientY-0;
}


function handleMouseDown(event)
{
    
    //Display CrossHair
    crossHair = new createjs.Bitmap(queue.getResult("crossHair"));
    crossHair.x = event.clientX-218;
    crossHair.y = event.clientY-52;
    stage.addChild(crossHair);
    createjs.Tween.get(crossHair).to({alpha: 0},1000);
    
    //Play Gunshot sound
    createjs.Sound.play("shot");

    // //Increase speed of enemy slightly
    // enemyXSpeed *= 1.05;
    // enemyYSpeed *= 1.06;

    //Obtain Shot position
    var shotX = event.clientX-218;
    var shotY = event.clientY-52;
    var spriteX = Math.round(animation.x);
    var spriteY = Math.round(animation.y);

    // Compute the X and Y distance using absolute value
    var distX = Math.abs(shotX - spriteX);
    var distY = Math.abs(shotY - spriteY);

    // Anywhere in the body or head is a hit 
    if(distX < 10 && distY < 10 )
    {
    	//Hit
    	stage.removeChild(animation);
    	batDeath();
    	score += 100;
    	scoreText.text = "1UP: " + score.toString();
    	createjs.Sound.play("deathSound");
    	
     //    //Make it harder next time
    	// enemyYSpeed *= 1.25;
    	// enemyXSpeed *= 1.3;

    	//Create new enemy
    	var timeToCreate = Math.floor((Math.random()*3500)+1);
	    setTimeout(createEnemy,timeToCreate);

    } else
    {
    	//Miss
    	score -= 10;
    	scoreText.text = "1UP: " + score.toString();

    }
    
}

// function updateTime()
// {
//     gameTime += 1;
//     if(gameTime > 60)
//     {
//         //End Game and Clean up
//         timerText.text = "GAME OVER";
//         stage.removeChild(animation);
//         stage.removeChild(crossHair);
//         createjs.Sound.removeSound("background");
//         var si =createjs.Sound.play("gameOverSound");
//         clearInterval(gameTimer);
//     }
//     else
//     {
//         timerText.text = "Time: " + gameTime
//         createjs.Sound.play("tick");
//     }
 
// var stage, w, h, loader;
// var sky, grant, ground, hill, hill2;

// function init() {
//     examples.showDistractor();
//     stage = new createjs.Stage("testCanvas");

//     // grab canvas width and height for later calculations:
//     w = stage.canvas.width;
//     h = stage.canvas.height;

//     manifest = [
//         {src: "spritesheet_grant.png", id: "grant"},
//         {src: "sky.png", id: "sky"},
//         {src: "ground.png", id: "ground"},
//         {src: "hill1.png", id: "hill"},
//         {src: "hill2.png", id: "hill2"}
//     ];

//     loader = new createjs.LoadQueue(false);
//     loader.addEventListener("complete", handleComplete);
//     loader.loadManifest(manifest, true, "../_assets/art/");
// }

// function handleComplete() {
//     examples.hideDistractor();

//     sky = new createjs.Shape();
//     sky.graphics.beginBitmapFill(loader.getResult("sky")).drawRect(0, 0, w, h);

//     var groundImg = loader.getResult("ground");
//     ground = new createjs.Shape();
//     ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0,groundImg.width,  h + groundImg.height);
//     ground.tileH = groundImg.height;
//     ground.x = w - groundImg.width;

//     hill = new createjs.Bitmap(loader.getResult("hill"));
//     hill.setTransform(Math.random() * w, h - hill.image.height * 4 - groundImg.height, 4, 4);
//     hill.alpha = 0.5;

//     hill2 = new createjs.Bitmap(loader.getResult("hill2"));
//     hill2.setTransform(Math.random() * w, h - hill2.image.height * 3 - groundImg.height, 3, 3);

//     var spriteSheet = new createjs.SpriteSheet({
//             framerate: 30,
//             "images": [loader.getResult("grant")],
//             "frames": {"regX": 82, "height": 292, "count": 64, "regY": 0, "width": 165},
//             // define two animations, run (loops, 1.5x speed) and jump (returns to run):
//             "animations": {
//                 "run": [0, 25, "run", 1.5],
//                 "jump": [26, 63, "run"]
//             }
//         });
//     grant = new createjs.Sprite(spriteSheet, "run");
//     grant.y = 35;

//     stage.addChild(sky, hill, hill2, ground, grant);
//     stage.addEventListener("stagemousedown", handleJumpStart);

//     createjs.Ticker.timingMode = createjs.Ticker.RAF;
//     createjs.Ticker.addEventListener("tick", tick);
// }

// function handleJumpStart() {
//     grant.gotoAndPlay("jump");
// }

// function tick(event) {
//     var deltaS = event.delta / 1000;
//     var position = grant.x + 150 * deltaS;

//     var grantW = grant.getBounds().width * grant.scaleX;
//     grant.x = (position >= w + grantW) ? -grantW : position;

//     ground.y = (ground.y + deltaS * 150) % ground.tileH;
//     hill.x = (hill.x - deltaS * 30);
//     if (hill.x + hill.image.width * hill.scaleX <= 0) {
//         hill.x = w;
//     }
//     hill2.x = (hill2.x - deltaS * 45);
//     if (hill2.x + hill2.image.width * hill2.scaleX <= 0) {
//         hill2.x = w;
//     }

//     stage.update(event);
// }