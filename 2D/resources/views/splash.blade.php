<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>{{$user->name}}'s Page</title>
	<link href="<?php echo asset('css/normalize.css')?>" type="text/css" rel="stylesheet" />
    <link href="<?php echo asset('css/game.css')?>" type="text/css" rel="stylesheet" />
    <link href='https://fonts.googleapis.com/css?family=Luckiest+Guy' rel='stylesheet' type='text/css'>
</head>
<body>
	<div class="background">
        <div class="container">
			<div>
				<img class="sign_user" src="<?php echo asset('assets/wooden-board.png')?>">
				<div class="splash">
					Don't let the enemy pass you!
					Miss more than 5 enemies and it's
					GAME OVER!
				</div>
			</div>
		</div>
		<div class="link_splash">
			<a class="button" href="/game">Play</a>
		</div>
	</div>
</body>
</html>
