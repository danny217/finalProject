var context;
var queue;
var WIDTH = 960;
var HEIGHT = 670;
var mouseXPosition;
var mouseYPosition;
var stage;
var animation;
var deathAnimation;
var spriteSheet;
var enemyXPos=100;
var enemyYPos=50;
var enemyXSpeed = 1.5;
var enemyYSpeed = 1.5;
var enemyH = 158;
var enemyW = 134;
var score = 0;
var scoreText;
var missed = 0;
var slippedByText;
var ground;
var allowed = 5;
var lvl = 1;
var timerSource; //references a setInterval method
var enemies = [];
var enemiesS = [];
var enTimer = null; // random timer for a new enemy
var enemyCount = 0;
var i = 0;
var heroXPos=470;
var heroYPos=500;
var crossHair;

// get random number between X and Y
function getRand(x, y) 
{
    return Math.floor(Math.random()*y)+x;
}

document.addEventListener("DOMContentLoaded", ready);

function ready(event)
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
        {id: 'shot', src: 'assets/Bow_Fire_Arrow.mp3'},
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
    slippedByText = new createjs.Text("Enemies Missed: " + missed, "36px Arial", "#FFF");
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

    heroAni.x = WIDTH/2;
    // heroAni.y = getRand(0, WIDTH);
    // enemyXPos = heroAni.x;
    // enemyYPos = heroAni.y;
    // heroAni.x = heroXPos;
    heroAni.y = 500;

    stage.addChild(heroAni);


    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.addEventListener('tick', tickEvent);

    // Create crosshair
    crossHair = new createjs.Bitmap(queue.getResult("crossHair"));
    stage.addChild(crossHair);
    


    // jetSprite = new createjs.Bitmap("assets/checkmark.png");

    // jetSprite.regX = jetSprite.image.width/2;

    // jetSprite.regY = jetSprite.image.height/2;

    // jetSprite.x = stage.canvas.width/2;

    // jetSprite.y = stage.canvas.height/2;
    // Add ticker
    // createjs.Ticker.setFPS(15);
    // createjs.Ticker.addEventListener('tick', enemyEvent);
    // stage.mouseenter(enemyEvent);
 //    var event = new createjs.Event("enemyEvent");
 // this.dispatchEvent(event);
    // createjs.Ticker.addEventListener('tick', this.pass);
    // Set up events AFTER the game is loaded
    window.onmousemove = handleMouseMove;
    window.onmousedown = handleMouseDown;
    stage.update();
    
}
    
function Enemy(x, y, w, h, speed, image) 
{
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.image = image;
}
function EnemyS(x, y, w, h, speed, image) 
{
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.image = image;
}
// Add Enemy function (adds a new enemy randomly)
function addEnemy() 
{
    clearInterval(enTimer);

    var randX = getRand(0, canvas.height - iEnemyH);
    enemies.push(new Enemy(randX, 0, enemyW, enemyH, - enemyYSpeed, oEnemyImage));
    enemiesS.push(new EnemyS(randX, 0, enemyW, enemyH, - enemyYSpeed, oEnemyImage));

    var interval = getRand(1000, 4000);

    enTimer = setInterval(addEnemy, interval); // loop
}

// Game over
function gameOver() 
{
    createjs.Sound.removeSound("background");
    createjs.Sound.play("gameOverSound");
    document.getElementById('game-over').style.display = "block";
    play = false;
}


// // Restart the game
// function restart() {
//     createjs.Sound.removeSound("gameOverSound");
//     document.getElementById('game-over').style.display = "none";
//     this.mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
//     // this.backgroundAudio.play();

//     this.queueLoaded(event);
// };

// }
// function typeEnemy(lvl)
// {
//     // this.lvl = lvl;
//     lvl = 1;
//     console.log("hmmm");
//     if(lvl = 1 ){
//     console.log("are you kiddin?");
        
    
//         var hp = 1;

//         console.log("are you kiddin again?");

//         animation = new createjs.Sprite(enemy, "walk");
//         animation.regX = 63;
//         animation.regY = 78;
//         animation.gotoAndPlay("walk");

//         animation.x = getRand(0, context.canvas.height - 78);
//         animation.y = getRand(0, context.canvas.height - 78);
//         // enemyXPos = animation.x;
//         // enemyYPos = animation.y;
//         animation.x = enemyXPos;
//         animation.y = enemyYPos;

//         stage.addChild(animation);
//         // createjs.Ticker.addEventListener('tick', enemyEvent);

//         // stage.update(event);
//         // createjs.EventDispatcher.initialize(typeEnemy); // add to a specific instance
//         // function enemyEvent(){
//         // //Make sure enemy is within game boundaries and move enemy 
//         //     if(enemyXPos < WIDTH && enemyXPos > 0)
//         //     {
//         //         enemyXPos += enemyXSpeed;
//         //     } else 
//         //     {
//         //         enemyXSpeed = enemyXSpeed * (-1);
//         //         enemyXPos += enemyXSpeed;
//         //     }
//         //     if(enemyYPos < HEIGHT && enemyYPos > 0)
//         //     {
//         //         enemyYPos += enemyYSpeed;
//         //     }

//         //     createjs.Ticker.addEventListener('tick', offScreen);
//         //     } 

//         }
    
//     // this.dispatchEvent(enemyEvent);
//     // if(lvl = 2 ){

//     //     function enemyBlue(){
//     //         var hp = 3;
//     //         var enemy = 1;

//     //         if(enemyYPos > HEIGHT && enemyYPos < 0 ){
//     //             missed += enemy;
//     //             slippedByText.text = "Enemies Missed: " + missed.toString();
//     //             delete enemyBlue();
//     //         }
//     //     }
//     // }
//     // animation = new createjs.Sprite(spriteSheet, "walk");
//     // animation.regX = 63;
//     // animation.regY = 78;
//     // animation.x = enemyXPos;
//     // animation.y = enemyYPos;
//     // animation.gotoAndPlay("walk");
//     // stage.addChildAt(animation, 3);
// }

// function createEnemy()
// {
//     typeEnemy();
// }

// function batDeath()
// {
//   deathAnimation = new createjs.Sprite(batDeathSpriteSheet, "die");
//   deathAnimation.regX = 99;
//   deathAnimation.regY = 58;
//   deathAnimation.x = enemyXPos;
//   deathAnimation.y = enemyYPos;
//   deathAnimation.gotoAndPlay("die");
//   stage.addChild(deathAnimation);
// }


// Ticker.setPaused(true);

function tickEvent(event)
{
    var deltaS = event.delta / 1000;

    ground.y = (ground.y + deltaS * 75) % ground.tileH;

    createjs.Ticker.setFPS(30);

    enemyEvent();
}

function handleMouseMove(event)
{

    // //Offset the position by 45 pixels so mouse is in center of crosshair
    // crossHair.x = event.clientX-55;
    // crossHair.y = event.clientY-50;

    var angle = Math.atan2(stage.mouseY - heroAni.y, stage.mouseX - heroAni.x );

    angle = angle * (180/Math.PI);


    if(angle < 0)

    {

        angle = 360 - (-angle);

    }

    heroAni.rotation = 90 + angle;



    // stage.update();
}

// function crosshair(event){
//     // Create crosshair
//     crossHair = new createjs.Bitmap(queue.getResult("crossHair"));
//     stage.addChild(crossHair);
// }

function handleClick()
{
    document.getElementById('game-over').style.display = "none";
    //stage.enableDOMEvents(false);
    //stage.enableDOMEvents(true);

    score = 0;
    missed = 0;
    enemies = [];
    stage.update();
    queueLoaded(event);

}


function handleMouseDown(event)
{
    // console.log("click");

    // //Display CrossHair
    
    // crossHair = new createjs.Bitmap(queue.getResult("crossHair"));
    // crossHair.x = event.clientX-55;
    // crossHair.y = event.clientY-50;
    // stage.addChild(crossHair);
    // // createjs.Tween.get(crossHair).to({alpha: 0},1000);
    // console.log("Hey");
    
    // // createjs.Tween.get(crossHair)
    // //     .call(function(){
    // //         console.log("Hey")
    // //     });
    // createjs.Tween.get(crossHair)
    //     .to({visible:true}, 1)
    //     .call(function(){
    //         console.log("done");   

    //         createjs.Tween.get(crossHair).to({alpha: 0},1000);
    //     });

    // createjs.Tween.get(crossHair)
    //     .call(function(){
    //         console.log("boo")
    //     });

    
    
    
    //Play Gunshot sound
    createjs.Sound.play("shot");

    // //Increase speed of enemy slightly
    // enemyXSpeed *= 1.05;
    // enemyYSpeed *= 1.06;

    //Obtain Shot position
    var shotX = Math.round(event.clientX);
    var shotY = Math.round(event.clientY);
   

    var remove = [];
    if (enemies.length > 0) 
    {
        for(var i=0;i<enemies.length;i++)
        {
            enemy = enemies[i];
            if (enemy != undefined) 
            {
                // enemies.forEach(function(enemy) {
                    if(collisionEnemy(shotX, shotY, 10))
                    {
                        console.log("shot " + animation.name);
                        //Hit
                        remove.push(enemy); 
                        // //Hit
                        // stage.removeChild(enemies[i]);
                        // enemies.splice(i, 1); 
                        score += 100;
                        scoreText.text = "1UP: " + score.toString();
                    } 
                // });

                if(collisionEnemy(heroAni.x, heroAni.y, 75))
                {
                    console.log("collided with " + animation.name);
                    
                    animation.x = animation.x * (-1);
                }
            }
        }
    }
    var removeS = [];
    if (enemiesS.length > 0) 
    {
        for(var i=0;i<enemiesS.length;i++)
        {
            enemyS = enemiesS[i];
            if (enemyS != undefined) 
            {
                // enemies.forEach(function(enemy) {
                    if(collisionEnemyS(shotX, shotY, 10))
                    {
                        console.log("shot " + animationS.name);
                        //Hit
                        removeS.push(enemyS); 
                        // //Hit
                        // stage.removeChild(enemies[i]);
                        // enemies.splice(i, 1); 
                        score += 100;
                        scoreText.text = "1UP: " + score.toString();
                    } 
                // });

                if(collisionEnemyS(heroAni.x, heroAni.y, 75))
                {
                    console.log("collided with " + animationS.name);
                    
                    animationS.x = animationS.x * (-1);
                }
                 
                

                // animation = enemy;

                // var spriteX = Math.round(animation.x);
                // var spriteY = Math.round(animation.y);

                // // Compute the X and Y distance using absolute value
                // var distX = Math.floor(shotX - spriteX);
                // var distY = Math.floor(shotY - spriteY);
                
                // console.log(distX);
                // // Anywhere in the body or head is a hit 
                // if(distX >= 0 && distX <= 70 && distY >= -59 && distY <= 59)
                // {
                //     console.log("shot " + animation.name);
                    
                //     //Hit
                //     remove.push(animation); 
                //     // stage.removeChild(animation);

                //     // var value_to_remove = enemies[ekey];
                //     // enemies.splice(enemies.indexOf(value_to_remove), 1);


                //     // batDeath();
                //     // score += 100;
                //     // scoreText.text = "1UP: " + score.toString();
                //     // createjs.Sound.play("deathSound");
                    
                //  //    //Make it harder next time
                //     // enemyYSpeed *= 1.25;
                //     // enemyXSpeed *= 1.3;
                //     // stage.update();
                //     // //Create new enemy
                //     // var timeToCreate = Math.floor((Math.random()*3500)+1);
                //     // setTimeout(createEnemy,timeToCreate);

                // } else
                // {

                //         //Miss
                //         score -= 10;
                //         scoreText.text = "1UP: " + score.toString();

                //     // console.log("missed " + animation.name);
                // }
            }
        }
    }
    // console.log(enemies.length);
    for(var i=0;i<remove.length;i++)
    {
        removeEnemy(remove[i].name);
    }
    
    // console.log(enemies.length);
    remove = [];

    // console.log(enemies.length);
    for(var i=0;i<removeS.length;i++)
    {
        removeEnemyS(removeS[i].name);
    }
    
    // console.log(enemies.length);
    removeS = [];
}

var en = 1;
function enemyEvent()
{     
    if(i % 30 == 0){

        enemyS = new createjs.SpriteSheet({
            "images": [queue.getResult('red')],
            "frames": {"width": 134, "height": 158},
            "animations": { "walk2": [0,2] },
            framerate: 6
            });

        animationS = new createjs.Sprite(enemyS, "walk2");
        // animationS.wait = getRand(10,20);
        // animationS.vector = {x: getRand(-10,10), y: getRand(0,2)};
        animationS.regX = 63;
        animationS.regY = 78;
        animationS.gotoAndPlay("walk2");

        animationS.x = getRand(-1, 960);
        animationS.name = "Frank " + en++;
        
        // enemy = new createjs.SpriteSheet({
        //     "images": [queue.getResult('red')],
        //     "frames": {"width": 134, "height": 158},
        //     "animations": { "walk": [0,2] },
        //     framerate: 6
        //     });

        // animation = new createjs.Sprite(enemy, "walk");
        // animation.wait = getRand(10,20);
        // animation.vector = {x: getRand(-10,10), y: getRand(0,2)};
        // animation.regX = 63;
        // animation.regY = 78;
        // animation.gotoAndPlay("walk");

        // animation.x = getRand(-1, 960);
        // animation.name = "charlie " + en++;
        // animation.y = getRand(960, -1);
        // enemyXPos = animation.x;
        // enemyYPos = animation.y;
        // animation.x = enemyXPos;
        // animation.y = enemyYPos;

        // var badguy = new createjs.Bitmap("images/badguy.png");
        // animation.x = getRand(-1,960)
        // animation.scaleX = 0.25;
        // animation.scaleY = 0.25;
        
        enemiesS.push(animationS);
        // console.log(enemies);

        stage.addChild(animationS);

        // stage.addChild(enemy);
         
    }

    if(i % 50 == 0){
        
        enemy = new createjs.SpriteSheet({
            "images": [queue.getResult('red')],
            "frames": {"width": 134, "height": 158},
            "animations": { "walk": [0,2] },
            framerate: 6
            });

        animation = new createjs.Sprite(enemy, "walk");
        animation.wait = getRand(10,20);
        animation.vector = {x: getRand(-10,10), y: getRand(0,2)};
        animation.regX = 63;
        animation.regY = 78;
        animation.gotoAndPlay("walk");

        animation.x = getRand(-1, 960);
        animation.name = "charlie " + en++;
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

        // console.log(enemies);
        stage.addChild(animation);


        // stage.addChild(enemy);
         
    }
    i++;
    enemyPass();

}

function collisionEnemy(posX, posY, Radius)
{
    var distX = posX - enemy.x;
    var distY = posY - enemy.y;
    var distR = Radius + 75;
    if(distX*distX + distY*distY <= distR*distR)
    {
        console.log("hit");
        return true;
    }
}

function collisionEnemyS(posX, posY, Radius)
{
    var distX = posX - enemyS.x;
    var distY = posY - enemyS.y;
    var distR = Radius + 75;
    if(distX*distX + distY*distY <= distR*distR)
    {
        console.log("hit");
        return true;
    }
}

// function missedEnemy(posX, posY, Radius){
//     var distX = posX - (enemy.x+10);
//     var distY = posY - (enemy.y+10);
//     var distR = Radius + 75;
//     if(distX*distX + distY*distY <= distR*distR){
//         console.log("missed");
//         return true;
//     }
// }

function removeEnemy(enemyName)
{
    // Find index of this enemyName...
    var idx=-1;
    for(var i=0; i<enemies.length;i++)
    {
        if(enemies[i].name == enemyName)
        {
            idx = i;
        }
    }
    // use splice to remove
    if(idx>=0)
    {
        // console.log("Removed " + enemyName);
        stage.removeChild(enemies[idx]);
        enemies.splice(idx, 1);
    }
}
function removeEnemyS(enemyName)
{
    // Find index of this enemyName...
    var idx=-1;
    for(var i=0; i<enemiesS.length;i++)
    {
        if(enemiesS[i].name == enemyName)
        {
            idx = i;
        }
    }
    // use splice to remove
    if(idx>=0)
    {
        // console.log("Removed " + enemyName);
        stage.removeChild(enemiesS[idx]);
        enemiesS.splice(idx, 1);
    }
}

function enemyPass()
{
    if (enemies.length > 0) 
    {
        var remove = [];

        for(var i=0;i<enemies.length;i++) 
        {
            enemy = enemies[i];

            if(enemy.wait && enemy.wait > 0)
            {
            enemy.x += enemy.vector.x;    

            enemy.wait--;
            } else 
            {
            // Get new vector
            enemy.wait = getRand(5,10);
            enemy.vector = {x: getRand(0,10), y: getRand(0,2)};
            
            }
        
        enemy.y += enemy.vector.y;
        
            if (enemy != undefined) 
            {

                animation = enemy;

                if(animation.x < WIDTH && animation.x > 0)
                {
                    animation.x;
                } else 
                {
                    animation.x = animation.x * (-1);
                    // animation.x = getRand(50, 150);
                }

                animation.y += 5;

               
                if(animation.y > (HEIGHT + 70) && animation.y > 0 )  
                {
                    // createjs.Ticker.reset('tick');
                    missed += 1;
                    slippedByText.text = "Enemies Missed: " + missed;
                    // animation.x = enemyXPos;
                    // animation.y = enemyYPos;
                    remove.push(animation);
                    // stage.removeChild(enemies[i]);
                    //     enemies.splice(i, 1);


                    // //delete enemies[ekey];
                    // if(missed = 5){
                    //     createjs.Ticker.setPaused(true);
                    // }
                    //Remove the sprite
                   // stage.removeChild(animation);
                    // createjs.Ticker.addEventListener('tick', stage);
                    // createjs.Ticker.addEventListener('tick', tickEvent);
                    // createjs.Ticker.addEventListener('tick', enemyEvent);
                    
                   // stage.update();
                    // createjs.Ticker.addEventListener('tick', enemyEvent);
                    // createjs.Ticker.addEventListener('tick', createEnemy);
                }  
            }
        }
    }
    if (enemiesS.length > 0) 
    {
        var removeS = [];
        for(var i=0;i<enemiesS.length;i++) 
        {
            enemyS = enemiesS[i];

        //     if(enemy.wait && enemy.wait > 0)
        //     {
        //     enemy.x += enemy.vector.x;    

        //     enemy.wait--;
        //     } else 
        //     {
        //     // Get new vector
        //     enemy.wait = getRand(5,10);
        //     enemy.vector = {x: getRand(0,10), y: getRand(0,2)};
            
        //     }
        
        // enemy.y += enemy.vector.y;
        
            if (enemyS != undefined) 
            {

                animationS = enemyS;

                if(animationS.x < WIDTH && animationS.x > 0)
                {
                    animationS.x;
                } else 
                {
                    animationS.x = animationS.x * (-1);
                    // animation.x = getRand(50, 150);
                }

                animationS.y += 5;

               
                if(animationS.y > (HEIGHT + 70) && animationS.y > 0 )  
                {
                    // createjs.Ticker.reset('tick');
                    missed += 1;
                    slippedByText.text = "Enemies Missed: " + missed;
                    // animation.x = enemyXPos;
                    // animation.y = enemyYPos;
                    remove.push(animationS);
                    // stage.removeChild(enemies[i]);
                    //     enemies.splice(i, 1);

                    // if(missed >= 5 && missed < 6)
                    // {
                    //     gameOver();
                    //     createjs.Ticker.reset('tick');
                    //     // restart();
                    // }

                    // //delete enemies[ekey];
                    // if(missed = 5){
                    //     createjs.Ticker.setPaused(true);
                    // }
                    //Remove the sprite
                   // stage.removeChild(animation);
                    // createjs.Ticker.addEventListener('tick', stage);
                    // createjs.Ticker.addEventListener('tick', tickEvent);
                    // createjs.Ticker.addEventListener('tick', enemyEvent);
                    
                   // stage.update();
                    // createjs.Ticker.addEventListener('tick', enemyEvent);
                    // createjs.Ticker.addEventListener('tick', createEnemy);
                }  
            }
        }
    }
    if(missed >= 5 && missed < 6)
    {
        gameOver();
        createjs.Ticker.reset('tick');
        // restart();
    }

    for(var i=0;i<remove.length;i++)
    {           
        removeEnemy(remove[i].name);
    }
    
    remove = [];

    for(var i=0;i<removeS.length;i++)
    {           
        removeEnemyS(removeS[i].name);
    }
    
    removeS = [];
}

// function removeRedo(){
//     for(var i=0;i<remove.length;i++){
                       
//         removeEnemy(remove[i].name);
//     }
    
//     remove = [];
// }
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
 
