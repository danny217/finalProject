<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>All Games</title>
</head>
<body>
	<h1>Games!!!!</h1>
	<table>
	<div>
		<tr>
			<th> Userame </th>
			<th> Score </th>
			<th> Edit </th>
			<th> Delete </th>
		</tr>
	</div>
	<div>
		@foreach($scores as $score)
		<tr>
			<td><a href="user">{{$score->name}}</a></td>
			<td>{{$score->score}}</td>

		</tr>
		@endforeach
		<a href="/games">Home</a><br><br>
		<a href="games/create">New Game</a><br><br>
	</div>
	</table>
</body>
</html>