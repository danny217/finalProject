<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>High Scores</title>
	<link href="<?php echo asset('css/normalize.css')?>" type="text/css" rel="stylesheet" />
    <link href="<?php echo asset('css/game.css')?>" type="text/css" rel="stylesheet" />
    <link href='https://fonts.googleapis.com/css?family=Luckiest+Guy' rel='stylesheet' type='text/css'>
</head>
<body>
	<div class="background">
        <div class="container">
        	<div class="shield">
        		<img id="shield" src="<?php echo asset('assets/wooden_shield_thing.png')?>">
				<div class="table_container">
					<h1>High Scores</h1>
					<table class="high">
					<div class="table_score">
						<tr >
							<th> Username </th>
							<th> Score </th>
						</tr>
					</div>
					<div>
						@foreach($scores as $score)
						<tr>
							<td><a class="white_link" href="user">{{$score->name}}</a></td>
							<td>{{$score->score}}</td>
						</tr>
						@endforeach
					</div>
					</table>
					<div class="home_link">
						<a class="button" href="/game">play again</a>
					</div>
					<div class="link_logout_score">
						<a class="button" href="/auth/logout">Logout</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>