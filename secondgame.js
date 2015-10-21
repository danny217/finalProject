var stage, w, h, loader;
var ground;
var mouseXPosition;
var mouseYPosition;
var batImage;
var animation;
var deathAnimation;
var spriteSheet;
var enemyXPos=100;
var enemyYPos=100;
var enemyXSpeed = 1.5;
var enemyYSpeed = 1.75;
var score = 0;
var scoreText;

function init() {
    examples.showDistractor();
    stage = new createjs.Stage("myCanvas");

    // grab canvas width and height for later calculations:
    w = stage.canvas.width;
    h = stage.canvas.height;

    manifest = [
        {src: 'crosshair.png', id: 'crossHair' },
        // {src: 'shot.mp3', id: 'shot'},
        {src: "background.jpg", id: "ground"},
        // {src: 'die.mp3', id: 'deathSound'},
        {src: 'batSpritesheet.png', id: 'batSpritesheet'},
        {src: 'batDeath.png', id: 'batDeath'},
    ];

    loader = new createjs.LoadQueue(false);
    // loader.installPlugin(createjs.Sound);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest, true, "assets/");
    // createjs.Sound.alternateExtensions = ["ogg"];
}


function handleComplete(event) {
    examples.hideDistractor();

    //Add Score
    scoreText = new createjs.Text("1UP: " + score.toString(), "36px Arial", "#FFF");
    scoreText.x = 10;
    scoreText.y = 10;
    stage.addChild(scoreText);

    var groundImg = loader.getResult("ground");
    ground = new createjs.Shape();
    ground.graphics.beginBitmapFill(groundImg).drawRect(0, -225, w + groundImg.width, h + groundImg.height);
    ground.tileH = groundImg.height;
	ground.y = groundImg.width;

    // Create bat spritesheet
    spriteSheet = new createjs.SpriteSheet({
        "images": [loader.getResult('batSpritesheet')],
        "frames": {"width": 198, "height": 117},
        "animations": { "flap": [0,4] }
    });

    // Create bat death spritesheet
    batDeathSpriteSheet = new createjs.SpriteSheet({
        "images": [loader.getResult('batDeath')],
        "frames": {"width": 198, "height" : 148},
        "animations": {"die": [0,7, false,1 ] }
    });

    // Create bat sprite
    createEnemy();

    stage.addChild(ground);
    // stage.addEventListener("stagemousedown", handleJumpStart);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);

    window.onmousedown = handleMouseDown;
}

function createEnemy()
{
    animation = new createjs.Sprite(spriteSheet, "flap");
    animation.regX = 99;
    animation.regY = 58;
    animation.x = enemyXPos;
    animation.y = enemyYPos;
    animation.gotoAndPlay("flap");
    stage.addChildAt(animation,1);
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

function tick(event) {
    var deltaS = event.delta / 1000;
    // var position = grant.x + 75 * deltaS;

    // var grantW = grant.getBounds().width * grant.scaleX;
    // grant.x = (position >= w + grantW) ? -grantW : position;

    ground.y = (ground.y + deltaS * 75) % ground.tileH;
    
    //Make sure enemy bat is within game boundaries and move enemy Bat
    if(enemyXPos < w && enemyXPos > 0)
    {
        enemyXPos += enemyXSpeed;
    } else 
    {
        enemyXSpeed = enemyXSpeed * (-1);
        enemyXPos += enemyXSpeed;
    }
    if(enemyYPos < h && enemyYPos > 0)
    {
        enemyYPos += enemyYSpeed;
    } else
    {
        enemyYSpeed = enemyYSpeed * (-1);
        enemyYPos += enemyYSpeed;
    }

    animation.x = enemyXPos;
    animation.y = enemyYPos;
}

function handleMouseDown(event)
{
    
    //Display CrossHair
    crossHair = new createjs.Bitmap(loader.getResult("crossHair"));
    crossHair.x = event.clientX-200;
    crossHair.y = event.clientY+10;
    stage.addChild(crossHair);
    createjs.Tween.get(crossHair).to({alpha: 0},1000);
    
    // //Play Gunshot sound
    // createjs.Sound.play("shot");

    //Increase speed of enemy slightly
    enemyXSpeed *= 1.05;
    enemyYSpeed *= 1.06;

    //Obtain Shot position
    var shotX = Math.round(event.clientX);
    var shotY = Math.round(event.clientY);
    var spriteX = Math.round(animation.x);
    var spriteY = Math.round(animation.y);

    // Compute the X and Y distance using absolte value
    var distX = Math.abs(shotX - spriteX);
    var distY = Math.abs(shotY - spriteY);

    // Anywhere in the body or head is a hit - but not the wings
    if(distX < 30 && distY < 59 )
    {
        //Hit
        stage.removeChild(animation);
        batDeath();
        score += 100;
        scoreText.text = "1UP: " + score.toString();
        // createjs.Sound.play("deathSound");
        
        //Make it harder next time
        enemyYSpeed *= 1.25;
        enemyXSpeed *= 1.3;

        //Create new enemy
        var timeToCreate = Math.floor((Math.random()*3500)+1);
        setTimeout(createEnemy,timeToCreate);

    } else
    {
        //Miss
        score -= 10;
        scoreText.text = "1UP: " + score.toString();

    }


    stage.update(event);

}