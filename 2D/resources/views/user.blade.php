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
				<div class="container_user">
					<h1 class="user_header">{{$user->name}}'s Page</h1>
					<div class="table_container_user">
						<table>
							<tr class="table_user">
								<th> Username </th>
								<th> Email </th>
								<th> Score </th>
							</tr>
							<tr class="table_user" >
								<td>{{$user->name}}</td>
								<td>{{$user->email}}</td>
								<td>{{$user->score}}</td>
								<td><a class="button" href="/user/edit">Edit</a></td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="link_user">
			<a class="button" href="scores">High Scores</a>
		</div>
		<div class="link_user_home">
			<a class="button" href="/game">Play Again</a>
		</div>
		<div class="link_user_logout">
			<a class="button" href="/auth/logout">Logout</a>
		</div>
	</div>
</body>
</html>
