var stage, w, h, loader;
var grant, ground;

function init() {
    examples.showDistractor();
    stage = new createjs.Stage("myCanvas");

    // grab canvas width and height for later calculations:
    w = stage.canvas.width;
    h = stage.canvas.height;

    manifest = [
        {src: "spritesheet_grant.png", id: "grant"},
        {src: "background.jpg", id: "ground"}
    ];

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest, true, "assets/");
}

function handleComplete() {
    examples.hideDistractor();

    // sky = new createjs.Shape();
    // sky.graphics.beginBitmapFill(loader.getResult("sky")).drawRect(0, 0, w, h);

    var groundImg = loader.getResult("ground");
    ground = new createjs.Shape();
    ground.graphics.beginBitmapFill(groundImg).drawRect(0, -225, w + groundImg.width, h + groundImg.height);
    ground.tileH = groundImg.height;
	ground.y = groundImg.width;


    // hill = new createjs.Bitmap(loader.getResult("hill"));
    // hill.setTransform(Math.random() * w, h - hill.image.height * 4 - groundImg.height, 4, 4);
    // hill.alpha = 0.5;

    // hill2 = new createjs.Bitmap(loader.getResult("hill2"));
    // hill2.setTransform(Math.random() * w, h - hill2.image.height * 3 - groundImg.height, 3, 3);

    var spriteSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": [loader.getResult("grant")],
            "frames": {"regX": 82, "height": 292, "count": 64, "regY": 0, "width": 165},
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            "animations": {
                "run": [0, 25, "run", 1.5],
                "jump": [26, 63, "run"]
            }
        });
    grant = new createjs.Sprite(spriteSheet, "run");
    grant.y = -75;

    stage.addChild(ground, grant);
    stage.addEventListener("stagemousedown", handleJumpStart);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);
}

function handleJumpStart() {
    grant.gotoAndPlay("jump");
}

function handleMouseDown(event)
{
    
    //Display CrossHair
    crossHair = new createjs.Bitmap(queue.getResult("crossHair"));
    crossHair.x = event.clientX-200;
    crossHair.y = event.clientY+10;
    stage.addChild(crossHair);
    createjs.Tween.get(crossHair).to({alpha: 0},1000);
    
    //Play Gunshot sound
    createjs.Sound.play("shot");

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
        createjs.Sound.play("deathSound");
        
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
}

function tick(event) {
    var deltaS = event.delta / 1000;
    var position = grant.x + 75 * deltaS;

    var grantW = grant.getBounds().width * grant.scaleX;
    grant.x = (position >= w + grantW) ? -grantW : position;

    ground.y = (ground.y + deltaS * 75) % ground.tileH;
    // hill.x = (hill.x - deltaS * 30);
    // if (hill.x + hill.image.width * hill.scaleX <= 0) {
    //     hill.x = w;
    // }
    // hill2.x = (hill2.x - deltaS * 45);
    // if (hill2.x + hill2.image.width * hill2.scaleX <= 0) {
    //     hill2.x = w;
    // }

    stage.update(event);
}