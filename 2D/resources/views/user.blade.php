<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>{{$user->name}}'s Home</title>
	<link href="<?php echo asset('css/normalize.css')?>" type="text/css" rel="stylesheet" />
    <link href="<?php echo asset('css/game.css')?>" type="text/css" rel="stylesheet" />
    <link href='https://fonts.googleapis.com/css?family=Luckiest+Guy' rel='stylesheet' type='text/css'>
</head>
<body>
	<div class="background">
		<h1>{{$user->name}}'s Home</h1>
		<table>
		<div>
			<tr>
				<th> Username </th>
				<th> Email </th>
				<th> Score </th>
				<th> Edit </th>
				<th> Delete </th>
			</tr>
		</div>
		<div>
			<tr>
				<td>{{$user->name}}</td>
				<td>{{$user->email}}</td>
				<td>{{$user->score}}</td>
				<td><a href="/user/edit">Edit</a></td>
				<td><a href="/games/{{$user->id}}/delete">Delete</a></td>
			</tr>
		</div>
		<div class="home_link">
			<a href="scores">High Scores</a>
		</div>
		<div class="home_link">
			<a href="/home">Play Again</a>
		</div>
		<a href="/auth/logout">Logout</a>
		</table>
	</div>
</body>
</html>
