<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Edit User</title>
	<link href="<?php echo asset('css/normalize.css')?>" type="text/css" rel="stylesheet" />
    <link href="<?php echo asset('css/game.css')?>" type="text/css" rel="stylesheet" />
    <link href='https://fonts.googleapis.com/css?family=Luckiest+Guy' rel='stylesheet' type='text/css'>
</head>
<body>

	<div class="background">
        <div class="container">
			<div>
				<img class="sign_user" src="<?php echo asset('assets/wooden-board.png')?>">
				<div class="container_edit">
					<h1 class="user_header">Edit User</h1>
					<div class="home_edit">
						<a class="button" href="/user">Home</a><br><br>
					</div>
					<div>
						<form method="post">
							<input type="hidden" name="_token" value="{{ csrf_token() }}">
							<div class="name_edit">
								<label>Username<input class="input_edit" type="text" name="name" value="{{$user->name}}"></label>
							</div>
							<div class="errors">
					        @if( count($errors) > 0 )

					            @if(count($errors->getBags()["default"]->get("unique")) > 0)
					            <span>
					                {{$errors->getBags()["default"]->get("unique")[0]}}
					            </span>
					            @endif
					        @endif
					        </div>
					        <div class="email_edit">
								<label>email<input class="input_edit" type="email" name="email" value="{{$user->email}}"></label>
							</div>
							<div class="errors">
					        @if( count($errors) > 0 )
					            @if(count($errors->getBags()["default"]->get("email")) > 0)
					            <span>
					                {{$errors->getBags()["default"]->get("email")[0]}}
					            </span>
					            @endif
					        @endif
					        </div>
					        <div class="edit_submit">
								<button>Submit Edit</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>

</body>
</html>