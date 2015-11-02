<!DOCTYPE html>
<html>
    <head>
        <title>Arrow To The Knee</title>
        <link href="<?php echo asset('css/normalize.css')?>" type="text/css" rel="stylesheet" />
        <link href="<?php echo asset('css/game.css')?>" type="text/css" rel="stylesheet" />
        <link href='https://fonts.googleapis.com/css?family=Luckiest+Guy' rel='stylesheet' type='text/css'>
        <script language="javascript" type="text/javascript" src="http://code.createjs.com/createjs-2013.12.12.min.js" ></script>
        <script language="javascript" type="text/javascript" src="https://code.createjs.com/tweenjs-0.6.1.min.js" ></script>
        <script language="javascript" type="text/javascript" src="https://code.createjs.com/easeljs-0.8.1.min.js" ></script>
        <script language="javascript" type="text/javascript" src="https://code.createjs.com/preloadjs-0.6.1.min.js" ></script>
        <script language="javascript" type="text/javascript" src="https://code.createjs.com/soundjs-0.6.1.min.js" ></script>
        <script language="javascript" type="text/javascript" src="<?php echo asset('js/fastclick.js')?>"></script>
        <script language="javascript" type="text/javascript" src="<?php echo asset('js/init.js')?>" ></script>
    </head>
    <body>
        <!-- <span class="score">This span</span> -->
        <canvas id="myCanvas"></canvas>
        <!-- <div class="score">SCORE: <span id="score"></span></div> -->
        <div class="game-over" id="game-over">GAME OVER
            <p>
                <span onclick="handleClick()">Click Here To Restart</span>
            </p>
            <p>
                <button>Login?</button>
            </p>
        </div>
    </body>
</html>
