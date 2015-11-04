<!DOCTYPE html>
<html>
    <head>
        <title>Arrow To The Knee</title>
        <link href="<?php echo asset('css/normalize.css')?>" type="text/css" rel="stylesheet" />
        <link href="<?php echo asset('css/game.css')?>" type="text/css" rel="stylesheet" />
        <link href='https://fonts.googleapis.com/css?family=Luckiest+Guy' rel='stylesheet' type='text/css'>
    </head>
    <body>

        <canvas id="myCanvas"></canvas>
            <span class="score">0</span>

        <div class="game-over" id="game-over">GAME OVER
            <img id="sign" src="<?php echo asset('assets/wooden_board.png')?>">
            <form method="post" action="/save">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input id="example" type="hidden" name="score" value="0">
                <div>
                    <span onclick="handleClick()">Click Here To Restart</span>
                </div>
                <div>Login or register to save</div>
                <div>
                    <a href="/save"><button>Save<button></a>
                </div>
                <div>
                    <a href="/auth/logout">Logout</a>
                </div>
            </form>
        </div>
    </body>
        <script language="javascript" type="text/javascript" src="http://code.createjs.com/createjs-2013.12.12.min.js" ></script>
        <script language="javascript" type="text/javascript" src="https://code.createjs.com/tweenjs-0.6.1.min.js" ></script>
        <script language="javascript" type="text/javascript" src="https://code.createjs.com/easeljs-0.8.1.min.js" ></script>
        <script language="javascript" type="text/javascript" src="https://code.createjs.com/preloadjs-0.6.1.min.js" ></script>
        <script language="javascript" type="text/javascript" src="https://code.createjs.com/soundjs-0.6.1.min.js" ></script>
        <script language="javascript" type="text/javascript" src="<?php echo asset('js/fastclick.js')?>"></script>
        <script language="javascript" type="text/javascript" src="<?php echo asset('js/init.js')?>" ></script>
</html>
