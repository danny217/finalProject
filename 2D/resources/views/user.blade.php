<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>{{$user->name}}'s Home</title>
</head>
<body>
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
			<td><a href="/games/{{$user->id}}/edit">Edit</a></td>
			<td><a href="/games/{{$user->id}}/delete">Delete</a></td>
		</tr>
	</div>
	{{-- <a href="/games">Home</a><br><br> --}}
	<a href="/auth/logout">Logout</a>
	</table>
</body>
</html>
